## Backend

The API exposes parts at `/parts` and products at `/products`, using integer IDs.
Picture and document requests use `PartId` to associate an item with a part.
Products can share Parts. Product-specific approvals, pictures and documents are
independent of a Part's attachments.

Product operations:

| Method | Route | Behavior |
| --- | --- | --- |
| GET | `/products/`, `/products/{id}` | List or retrieve products with their parts. |
| POST | `/products/` | Create a product from `Name`, `Description`, `Manufacturer`, `Designation`, and `ApplicationDate`. |
| PUT | `/products/{id}` | Update those product fields. |
| POST | `/products/{id}/parts/{partId}` | Associate an existing part; duplicates return 409. |
| DELETE | `/products/{id}` | Delete the product and keep its parts. |
| DELETE | `/products/{id}/with-parts` | Delete the product and its unshared parts; keep shared parts. |
| DELETE | `/products/{id}/parts/{partId}` | Remove the association and keep the part. |
| DELETE | `/products/{id}/parts/{partId}/with-part` | Remove the association and delete the part only if it is not shared. |

Deleting a shared part returns 409. `DELETE /parts/{id}` also returns 409 when
any product uses the part. Missing products, parts, or associations return 404.
When a part is deleted, its approvals are deleted and its pictures and documents
are retained without a part association, following the existing Part rules.

Product-owned approvals can be listed or created at `/products/{id}/approvals`;
individual approvals can be retrieved at `/products/{id}/approvals/{approvalId}`.
Product pictures and documents have corresponding list and item routes under
`/products/{id}/pictures` and `/products/{id}/documents`, plus `/content` and
`/thumbnail` item routes. Upload pictures or documents to their respective
`/upload-base64` or `/upload-multipart` routes. Deleting a product also deletes
its own approvals, pictures and documents, including their blobs; Part-owned
attachments are not Product-owned attachments. Product multipart uploads do not
use antiforgery tokens because the API currently has no cookie authentication;
add CSRF protection before introducing cookie-based authentication.

The initial EF Core migration creates the `Parts` table and related tables.
The design-time context targets the SQL Server configured in
`DesignTimeDbContextFactory`; verify that target before applying migrations.
From the solution root in PowerShell:

```powershell
dotnet build
dotnet ef database update --project src\ControlPilot.Infrastructure\ControlPilot.Infrastructure.csproj --startup-project src\ControlPilot.Api\ControlPilot.Api.csproj --context ApplicationDbContext
```

For subsequent schema changes, add a new migration before updating the database:

```powershell
dotnet ef migrations add MigrationName --project src\ControlPilot.Infrastructure\ControlPilot.Infrastructure.csproj --startup-project src\ControlPilot.Api\ControlPilot.Api.csproj --context ApplicationDbContext
```


## Testing

The Product repository SQL Server integration test runs only when
`CONTROLPILOT_SQL_TEST_CONNECTION` is set. Use a test SQL Server account with
permission to create and drop databases. The test creates a uniquely named
`ControlPilot_ProductTests_...` database, applies migrations and deletes that
specific database afterward. For example:

 added a React + Vite + TypeScript frontend in frontend\, set up for local Static Web Apps development. I started the API and swa start together. http://localhost:4280 returned 200 and /api/products returned 200 through the proxy. I didn't try adding or deleting a product in the browser, and nothing is deployed to Azure yet.
What I added
•	Products page: src\App.tsx and src\api.ts list, add and delete products. They call /api/products on the same origin, so no CORS is needed.
•	SWA config: frontend\swa-cli.config.json runs the Vite dev server and proxies /api to the API on localhost:5063. public\staticwebapp.config.json adds the single-page-app fallback to index.html.
•	CLI: @azure/static-web-apps-cli is installed as a dev dependency.
•	Vite proxy: /api is also proxied in vite.config.ts, so plain npm run dev works too.
•	API routes: these now start with /api/products, so local and Azure behave the same.

Run it locally
1.	Start the API with the http profile, which listens on port 5063.
2.	In frontend\, run npm run swa.
3.	Open http://localhost:4280.
Before the products work: the database must exist. I haven't created the initial migration yet; the dotnet ef commands are in my earlier message.

Deploying to Azure
•	Frontend: create an Azure Static Web App. The app location is frontend, the output location is dist, and the build is npm run build. The GitHub Actions workflow it generates handles deployment.
•	Backend: deploy the ASP.NET API separately, for example to App Service. Then link it to the Static Web App as its backend so /api works in production. Linking needs the Standard plan.
I could not use the file tool to create App.tsx, so I wrote that one file through PowerShell.

```powershell
$env:CONTROLPILOT_SQL_TEST_CONNECTION = 'Server=localhost;Database=master;Trusted_Connection=True;TrustServerCertificate=True;'
dotnet test src\ControlPilot.Tests\ControlPilot.Tests.csproj
```

Without the variable, that test is reported as skipped.