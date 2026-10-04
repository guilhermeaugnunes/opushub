# OpusHub — API de Gestão de Repertório & Cifras Musicais

API REST desenvolvida em **C# / ASP.NET Core** com **Entity Framework Core** e banco de dados relacional (**SQL Server**). O sistema gerencia um acervo musical estruturado, permitindo catalogar obras, artistas, metadados técnicos de execução (tonalidade, andamento em BPM, fórmulas e cifras) e consultas parametrizadas.

---

## Tecnologias e Padrões Utilizados

- **Linguagem & Framework:** C# (.NET 10 / ASP.NET Core Web API)
- **Acesso a Dados & ORM:** Entity Framework Core (Code-First Migrations, Fluent API)
- **Banco de Dados Relacional:** Microsoft SQL Server (LocalDB)
- **Documentação de API:** Swagger / OpenAPI (Swashbuckle)
- **Integração:** CORS habilitado para consumo por Single Page Applications (React / TypeScript)
- **Controle de Versão:** Git / GitHub Flow
- **Front-end** O projeto possui interface gráfica em React + TypeScript (Vite)

---

## Decisões Arquiteturais e de Modelagem

1. **Mapeamento Declarativo com Fluent API:**  
   Em vez de poluir as entidades de domínio com atributos de validação de dados (`Data Annotations`), o mapeamento relacional foi encapsulado no `OnModelCreating` do `AppDbContext`. Isso garante separação de responsabilidades e controle estrito sobre tipos de colunas, restrições `NOT NULL` e limites de caracteres no banco.
2. **Consultas Assíncronas e Otimizadas:**  
   Endpoints utilizam métodos assíncronos (`async/await`) em todas as operações de E/S (`ToListAsync`, `FindAsync`, `SaveChangesAsync`), liberando threads do thread-pool para manter alta escalabilidade sob concorrência.
3. **Filtros Parametrizados:**  
   O endpoint de listagem implementa consultas dinâmicas via LINQ sobre `IQueryable`, traduzindo filtros de gênero e tom diretamente para cláusulas `WHERE` no SQL Server.

---

## Como Executar o Projeto Localmente

### Pré-requisitos
- [.NET SDK](https://dotnet.microsoft.com/) instalado
- [SQL Server](https://www.microsoft.com/sql-server) ou LocalDB (já incluído com o Visual Studio)
- Git

### Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone [https://github.com/SEU-USUARIO/opushub.git](https://github.com/SEU-USUARIO/opushub.git)
   cd opushub
   ```

2. **Restaurar dependências:**
   ```bash
   dotnet restore
   ```

3. **Executar migrações do banco de dados:**
   ```bash
   dotnet ef database update
   ```

4. **Executar a API:**
   ```bash
   dotnet run
   ```

5. **Acessar a documentação interativa da API:**
Abra o navegador e acesse: `https://localhost:5244/swagger` (ou a porta informada no terminal).

6. **Acessar o Front-end do projeto:** Entre no diretório opushub-ui, abra o terminal e digite:
   ```bash
      cd opushub-ui
      npm install
      npm run dev
   ```

---

**Endpoints disponíveis incluem:**
| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/musicas` | Lista todas as músicas (suporta filtros `?genero=` e `?tom=`) |
| `GET` | `/api/musicas/{id}` | Obtém os detalhes de uma música específica |
| `POST` | `/api/musicas` | Cadastra uma nova música com cifra e metadados |
| `PUT` | `/api/musicas/{id}` | Atualiza os dados de uma música existente |
| `DELETE` | `/api/musicas/{id}` | Remove uma música do acervo |