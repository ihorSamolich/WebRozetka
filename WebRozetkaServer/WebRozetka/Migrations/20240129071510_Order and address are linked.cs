using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebRozetka.Migrations
{
    /// <inheritdoc />
    public partial class Orderandaddressarelinked : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "WarehousesRef",
                table: "Order",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Order_WarehousesRef",
                table: "Order",
                column: "WarehousesRef");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Warehouses_WarehousesRef",
                table: "Order",
                column: "WarehousesRef",
                principalTable: "Warehouses",
                principalColumn: "Ref");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Warehouses_WarehousesRef",
                table: "Order");

            migrationBuilder.DropIndex(
                name: "IX_Order_WarehousesRef",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "WarehousesRef",
                table: "Order");
        }
    }
}
