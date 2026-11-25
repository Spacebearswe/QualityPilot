# QualityPilot

![CampusEats shown on desktop, tablet and mobile](docs/images/amiresponsive.png)

[![CI](https://github.com/NiclO1337/campus-eats/actions/workflows/ci.yml/badge.svg)](https://github.com/NiclO1337/campus-eats/actions/workflows/ci.yml)

**Product quality and envritoment control
Keeps your product development controlled with the enviroment in mind. 

Link to live site: [ControlPilot](https://niclo1337.github.io/campus-eats/)
Edit the link
<hr>

## Table of contents

- [About the project](#about-the-project)
  - [Team](#team)
- [User Experience (UX)](#user-experience-ux)
  - [Target audience](#target-audience)
  - [User stories](#user-stories)
- [Design](#design)
  - [Sitemap](#sitemap)
  - [Look and feel](#look-and-feel)
    - [Fonts](#fonts)
    - [Colours](#colours)
    - [Spacing and corners](#spacing-and-corners)
    - [Logo and favicon](#logo-and-favicon)
  - [Accessibility](#accessibility)
- [Features](#features)
- [Technologies used](#technologies-used)
- [Getting started](#getting-started)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [More documentation](#more-documentation)

## About the project

ControlPilot lets companies to track a projects products and enforce quality
and environment approvals to them.  

### Team

Stefan.

## User Experience (UX)

### Target audience

-**Companies** that designs systems that are using products
  and needs a tool for control of the complience of the products in the system 
- **Manufactures** of the products that they are using.
- **Users** that need to be sure of the quality of the used products.


### User stories

#### Users goals

- Keep track of products that fulfilles both quality and enviromental requirement
- Simple to use
- Enforces fulfillment that only can be granted of users with the right xxx
- Products can be exported and imported between systems
- xxxxFind answers in the FAQ and read the terms and privacy information

#### Project goals

- Build a small, working, well-tested app instead of a big unfinished one
- Keep the code understandable for beginners
- Make the site accessible and usable on mobile and desktop

## Design

The UI design comes from our wireframes (mobile and desktop).

### Sitemap

| Page                          | Address                                                                  |
| ----------------------------- | ------------------------------------------------------------------------ |
| Home (login)                  | `/`                                                                      |
| Products                      | `/products`                                                              |
|                               |                                                                          |
| FAQ                           | `/faq`                                                                   |
| Information pages             | `/about`, `/terms`, `/privacy`, `/cookies`, `/contact`, `/accessibility` |
|                               | ``                                                                       |
| Not found (any other address) | `*`                                                                      |

### Look and feel

Shared colours, typography and component styles are defined in
`src/theme/theme.ts`.

#### Fonts

- Headings: Montserrat.
- Body text and buttons: Open Sans.
- Fonts are loaded through Google Fonts in `index.html`.

#### Colours

| Purpose                                       | Hex colour |
| --------------------------------------------- | ---------- |
| Primary                                       | `#1f5c3f`  |
| Secondary                                     | `#4b5563`  |
| Success                                       | `#2e7d32`  |
| Warning                                       | `#b45309`  |
| Error                                         | `#c62828`  |
| Page background                               | `#f5f5f5`  |
| Paper background                              | `#ffffff`  |
| Primary text                                  | `#1f2937`  |
| Secondary text                                | `#4b5563`  |
| Text on primary, secondary and status colours | `#ffffff`  |

#### Spacing and corners

- Base spacing unit: 8px.
- Default border radius: 8px.
- Dialog border radius: 16px.

#### Logo and favicon

- Header logo: `public/logo.svg`.
- Matching browser icon: `public/favicon.svg`.

### Accessibility

- Semantic HTML, one `h1` per page and headings in order
- Labels on every input, buttons for actions and links for navigation
- Accessibility rules (`jsx-a11y`) are checked by the linter
- An Accessibility page describes what we have done and what is still missing

## Features

| Feature                                                                       | Status                                  |
| ----------------------------------------------------------------------------- | --------------------------------------- |
---| Home page with a map of the restaurants around the university                 | Implemented (see `docs/MAP.md`)         |
| Restaurants page with name search, dietary filters and restaurant details     | Implemented (`RestaurantCard`)          |
| Opening hours per weekday, with an "Open / Closed" label                      | Implemented (data in `restaurants.ts`)  |
| Order popup (meal, drink, add-ons, sides, menu link)                          | Implemented (reusable `Modal`)          |
| FAQ page                                                                      | Implemented (`src/data/faq.ts`)         |
| Information pages (About Us, Terms, Privacy, Cookies, Contact, Accessibility) | Implemented (`src/data/infoPages/`)     |
| Checkout with student discount, delivery or pickup, estimated time            | Implemented (`CheckoutForm`)            |
| Cart: add meals, drinks, add-ons and sides, review and change the order       | Implemented (`CartDrawer`)              |
| Payment with Swish                                                            | Implemented (demo, no real payment)     |
| Login (reuses the `Modal`)                                                    | Implemented (demo, see `docs/LOGIN.md`) |

The six information pages (About Us, Terms & Conditions, Privacy Policy,
Cookies & Storage, Contact and Accessibility) describe the current school-project
demo and distinguish simulated features from planned real services.

# Technologies used

## Frontend

- [React](https://react.dev/) 19 and [TypeScript](https://www.typescriptlang.org/) (strict), built with [Vite](https://vite.dev/)
- [Material UI](https://mui.com/material-ui/) (MUI) for components, with a small theme in `src/theme/theme.ts`
- [React Router](https://reactrouter.com/) with `HashRouter` (works on GitHub Pages)
- [MapLibre](https://maplibre.org/) and [OpenFreeMap](https://openfreemap.org/) for the map (free, no API key), through `@vis.gl/react-maplibre`
- [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/) for tests
- [oxlint](https://oxc.rs/docs/guide/usage/linter) for linting and [Prettier](https://prettier.io/) for formatting
- GitHub Actions and GitHub Pages for CI/CD

## Backend

- C# 14
- .NET 10
- Entity framework, EF Core 11.0
-Comunicates with fronted with an minimal API
- Solution follows the Clean Code principle



```
/ControlPilot.sln
/src
├── ControlPilot.Domain/               # Layer 1: Entities
│   ├── Entities/                      # Product.cs, UseApproval.cs
│   ├── ValueObjects/                  # Money.cs, Address.cs Not used here yet 
│   └── Exceptions/                    # DomainException.cs
│   ├── Interfaces/                    # IProductRepository.cs
│
├── ControlPilot.Application/          # Layer 2: Use Cases (Refs Domain)
│   ├── UseCases/                      # ex ApplyDiscountCommand.cs not used yet
│   ├── DTOs/                          # Request/Response records
│   └── DependencyInjection.cs         # AddApplication() extension
│
├── ControlPilot.Infrastructure/       # Layer 3: Adapters (Refs App+Domain)
│   ├── Persistence/                   # AppDbContext, Repositories
│   ├── Messaging/                     # Kafka/ServiceBus publishers
│   ├── Migrations/                    # Entity framework Migrations
│   └── DependencyInjection.cs         # AddInfrastructure() extension
│
└── ControlPilot.WebAPI/               # Layer 4: Frameworks (Refs App+Infra)
    ├── Endpoints/                     # ProductEndpoints.cs
    ├── Requests/                      # CreateProductRequest.cs
    ├── Middleware/                    # Global Exception Handler
    └── Program.cs                     # The Composition Root
````

To create thumbnails we use an Azure-friendly OSS approach:
•	PDF: PDFium first-page to PNG
•	TXT: SkiaSharp text preview thumbnail
•	DOCX: OpenXML content extraction + SkiaSharp rendered preview thumbnail (not pixel-perfect)
This avoids OS-level office installation and external executable path management, while keeping license cost low.
# Getting started

## Frontend

You need **Node.js 24 LTS** (see `.nvmrc`; Node 22.22 or newer also works) and Git.
Check with `node -v`.

```bash
git clone -----https://github.com/NiclO1337/campus-eats.git
cd campus-eats
npm install
npm run dev
```

Open the address that `npm run dev` prints (normally <http://localhost:5173>).

All the other commands (tests, lint, build, ...) are listed in
[`CONTRIBUTING.md`](CONTRIBUTING.md#commands).

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

## Frontend

Create fronted project 

npm create vite@latest frontend -- --template react-ts --no-interactive 2>&1 | Select -Last 5; cd frontend; npm install 2>&1 | Select -Last 3; npm i -D @azure/static-web-apps-cli 2>&1 | Select -Last 3; Get-ChildItem -Name; Get-Content vite.config.ts; Get-Content package.json


Automated and manual tests, results, coverage and known limitations are in
[`TESTING.md`](TESTING.md). To run the automated tests and all other checks:

```bash
npm run check
```

## Backend 

Test for the backend are using XUnit 
Test are started inside VisualStudio and xxx

## Deployment

The site is deployed to **GitHub Pages** automatically with **GitHub Actions**.

| Workflow                       | When it runs                       | What it does                                                           |
| ------------------------------ | ---------------------------------- | ---------------------------------------------------------------------- |
| `.github/workflows/ci.yml`     | On every pull request              | Lint, formatting, tests and build. Must be green to merge              |
| `.github/workflows/deploy.yml` | When something is merged to `main` | Runs the same checks, builds the site and publishes it to GitHub Pages |

So the flow is: branch → PR → green checks + approval → merge → **live site
updates a minute or two later**. Nobody deploys by hand. Follow the progress in
the **Actions** tab on GitHub. If the checks fail, nothing is deployed and the
old site stays up.

The one-time setup for repository admins, and a few things to know (the base
path, `HashRouter`, undoing a release), are in
[`CONTRIBUTING.md`](CONTRIBUTING.md#deployment-setup-and-good-to-know).

## Contributing

Want to work on the code? [`CONTRIBUTING.md`](CONTRIBUTING.md) explains how:

- the [commands](CONTRIBUTING.md#commands) and the [project structure](CONTRIBUTING.md#project-structure)
- how to [add restaurants, menus, opening hours and FAQ entries](CONTRIBUTING.md#working-in-the-code), and our styling rules
- our [Git workflow](CONTRIBUTING.md#working-together-with-git) (branches, pull requests, squash and merge, merge conflicts)
- what to check [before you open a pull request](CONTRIBUTING.md#before-you-open-a-pull-request)

## More documentation

| File                                                     | What it is                                                                                   |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [`CONTRIBUTING.md`](CONTRIBUTING.md)                     | Commands, project structure, code conventions, Git workflow and checks before a pull request |
|                                                          |                                                                                              |
| [`docs/LOGIN.md`](docs/LOGIN.md)                         | What the simulated login does, the checkout gate and student verification                    |
| [`docs/BRANCH_PROTECTION.md`](docs/BRANCH_PROTECTION.md) | Protect `main` and require a specific reviewer                                               |
| [`TESTING.md`](TESTING.md)                               | Automated and manual tests, results, coverage and known limitations                          |
| [AGENTS.md](AGENTS.md)                                   | Instructions for coding agents when they help in this repo                                   |
