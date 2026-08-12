import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home, { ActivityPage, AfricaFuturePage, ArchitecturePage, ArticlesPage, CapabilitiesPage, DocsPage, EcosystemPage, ExplorerPage, InstallCenter } from "./pages/Home";

function Routes() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/install"} component={InstallCenter} />
      <Route path={"/architecture"} component={ArchitecturePage} />
      <Route path={"/ecosystem"} component={EcosystemPage} />
      <Route path={"/future-africa"} component={AfricaFuturePage} />
      <Route path={"/capabilities"} component={CapabilitiesPage} />
      <Route path={"/articles"} component={ArticlesPage} />
      <Route path={"/docs"} component={DocsPage} />
      <Route path={"/activity"} component={ActivityPage} />
      <Route path={"/explore/:slug"} component={ExplorerPage} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "") || "/"}>
            <Routes />
          </WouterRouter>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
