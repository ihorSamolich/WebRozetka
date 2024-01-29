using AutoMapper;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;
using System.Text;
using WebRozetka.Controllers;
using WebRozetka.Data;
using WebRozetka.Data.Entities.Addres;
using WebRozetka.Models.Addres;

namespace WebRozetka.Services
{
    public class NovaPoshtaService
    {
        private const string API_KEY_NOVAPOSHTA = "7a30218545088acfb427da6006de245a";

        private readonly HttpClient _httpClient;
        private readonly IMapper _mapper;
        private readonly AppEFContext _context;

        public NovaPoshtaService(IMapper mapper, AppEFContext context)
        {
            _httpClient = new HttpClient();
            _mapper = mapper;
            _context = context;
        }


        public async Task GetNPWarehouses()
        {
            string jsonData = @$"
                {{
                    ""apiKey"": ""{API_KEY_NOVAPOSHTA}"",
                    ""modelName"": ""Address"",
                    ""calledMethod"": ""getWarehouses"",
                    ""methodProperties"": {{
                        ""Page"" : ""pageNum"",
                        ""Limit"" : ""200"",
                        ""Language"" : ""UA""
                    }}
                }}";

            await ProcessApiResponse<WarehouseNPViewModel, WarehouseEntity>(jsonData);

        }

        public async Task GetNPSettlements()
        {
            string jsonData = @$"
                {{
                    ""apiKey"": ""{API_KEY_NOVAPOSHTA}"",
                    ""modelName"": ""AddressGeneral"",
                    ""calledMethod"": ""getSettlements"",
                    ""methodProperties"": {{
                        ""Page"" : ""pageNum"",
                        ""Warehouse"": ""1"",
                        ""Limit"":""200""
                    }}
                }}";

            await ProcessApiResponse<SettlementNPViewModel, SettlementEntity>(jsonData);

        }

        public async Task GetNPAreas()
        {

            string jsonData = $@"{{
                ""apiKey"": ""{API_KEY_NOVAPOSHTA}"",
                ""modelName"": ""Address"",
                ""calledMethod"": ""getSettlementAreas"",
                ""methodProperties"": {{
                    ""Page"" : ""pageNum"",
                    ""Ref"" : """"
                }}
            }}";


            await ProcessApiResponse<AreaNPViewModel, AreasEntity>(jsonData);
        }

        private async Task ProcessApiResponse<TApi, TEntity>(string jsonData) where TEntity : class
        {
            var dbSet = _context.Set<TEntity>();
            int page = 1;

            while (true)
            {
                string jsonWithPage = jsonData.Replace($"\"Page\" : \"pageNum\"", $"\"Page\" : \"{page}\"");

                HttpContent content = new StringContent(jsonWithPage, Encoding.UTF8, "application/json");
                HttpResponseMessage response = await _httpClient.PostAsync("https://api.novaposhta.ua/v2.0/json/", content);

                if (response.IsSuccessStatusCode)
                {
                    string responseData = await response.Content.ReadAsStringAsync();
                    var result = JsonConvert.DeserializeObject<ApiResponse<TApi>>(responseData);

                    if (result.Data.Any())
                    {
                        List<TEntity> dataEntities = _mapper.Map<List<TEntity>>(result.Data);

                        dbSet.AddRange(dataEntities);
                        _context.SaveChanges();

                        page++;
                    }
                    else
                    {
                        break;
                    }
                }
                else
                {
                    Console.WriteLine($"Error: {response.StatusCode}");
                }
            }
        }
    }

    public class ApiResponse<T>
    {
        public List<T> Data { get; set; }
    }
}
