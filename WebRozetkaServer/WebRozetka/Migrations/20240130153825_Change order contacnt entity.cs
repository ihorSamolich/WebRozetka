using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebRozetka.Migrations
{
    /// <inheritdoc />
    public partial class Changeordercontacntentity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<string>(
                name: "WarehousesRef",
                table: "OrderContactInfo",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrderContactInfo_WarehousesRef",
                table: "OrderContactInfo",
                column: "WarehousesRef");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderContactInfo_Warehouses_WarehousesRef",
                table: "OrderContactInfo",
                column: "WarehousesRef",
                principalTable: "Warehouses",
                principalColumn: "Ref");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderContactInfo_Warehouses_WarehousesRef",
                table: "OrderContactInfo");

            migrationBuilder.DropIndex(
                name: "IX_OrderContactInfo_WarehousesRef",
                table: "OrderContactInfo");

            migrationBuilder.DropColumn(
                name: "WarehousesRef",
                table: "OrderContactInfo");

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
    }
}
