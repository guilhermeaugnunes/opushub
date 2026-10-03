using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OpusHub.api.Migrations
{
    /// <inheritdoc />
    public partial class Inicial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Musicas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Titulo = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Artista = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Album = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Bpm = table.Column<int>(type: "int", nullable: false),
                    Tom = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    AnoLancamento = table.Column<int>(type: "int", nullable: false),
                    Genero = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ConteudoCifra = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DataCadastro = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Musicas", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Musicas");
        }
    }
}
