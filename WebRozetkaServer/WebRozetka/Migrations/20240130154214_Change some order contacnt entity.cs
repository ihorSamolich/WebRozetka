using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebRozetka.Migrations
{
    /// <inheritdoc />
    public partial class Changesomeordercontacntentity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderContactInfo_Warehouses_WarehousesRef",
                table: "OrderContactInfo");

            migrationBuilder.RenameColumn(
                name: "WarehousesRef",
                table: "OrderContactInfo",
                newName: "WarehousesId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderContactInfo_WarehousesRef",
                table: "OrderContactInfo",
                newName: "IX_OrderContactInfo_WarehousesId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderContactInfo_Warehouses_WarehousesId",
                table: "OrderContactInfo",
                column: "WarehousesId",
                principalTable: "Warehouses",
                principalColumn: "Ref");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderContactInfo_Warehouses_WarehousesId",
                table: "OrderContactInfo");

            migrationBuilder.RenameColumn(
                name: "WarehousesId",
                table: "OrderContactInfo",
                newName: "WarehousesRef");

            migrationBuilder.RenameIndex(
                name: "IX_OrderContactInfo_WarehousesId",
                table: "OrderContactInfo",
                newName: "IX_OrderContactInfo_WarehousesRef");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderContactInfo_Warehouses_WarehousesRef",
                table: "OrderContactInfo",
                column: "WarehousesRef",
                principalTable: "Warehouses",
                principalColumn: "Ref");
        }
    }
}
