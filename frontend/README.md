# QualityPilot frontend

The React, TypeScript, and Material UI frontend lists products and lets you create, edit, and delete them using the backend's `/api/products` endpoints. Create and edit open a form beside the list, or below it on smaller screens. Application dates are displayed in the browser's local time.

## Local development

Start the API from the repository root (and ensure its database is configured and available):

```powershell
dotnet run --project src\QualityPilot.Api --launch-profile http
```

In another terminal, start the Static Web Apps emulator:

```powershell
cd frontend
npm install
npm run swa
```

Open `http://localhost:4280`. Alternatively, `npm run dev` serves the frontend on `http://localhost:5173` and proxies `/api` to the same API.

Run `npm run build` and `npm run lint` from the frontend directory to check changes.
