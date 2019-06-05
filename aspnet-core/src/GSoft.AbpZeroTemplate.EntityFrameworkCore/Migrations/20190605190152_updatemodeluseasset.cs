using Microsoft.EntityFrameworkCore.Migrations;

namespace GSoft.AbpZeroTemplate.Migrations
{
    public partial class updatemodeluseasset : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DepreciationValueForTheFirstMonth",
                table: "UseAssets");

            migrationBuilder.DropColumn(
                name: "EndDateOfDepreciation",
                table: "UseAssets");

            migrationBuilder.DropColumn(
                name: "StartDateOfDepreciation",
                table: "UseAssets");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "DepreciationValueForTheFirstMonth",
                table: "UseAssets",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<string>(
                name: "EndDateOfDepreciation",
                table: "UseAssets",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StartDateOfDepreciation",
                table: "UseAssets",
                nullable: true);
        }
    }
}
