import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import { type BrowserLocationHook, useBrowserLocation } from "wouter/use-browser-location";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home, { ActivityPage, AfricaFuturePage, ArchitecturePage, ArticlesPage, CapabilitiesPage, DocsPage, EcosystemPage, ExplorerPage, InstallCenter } from "./pages/Home";

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/install" component={InstallCenter} />
      <Route path="/architecture" component={ArchitecturePage} />
      <Route path="/ecosystem" component={EcosystemPage} />
      <Route path="/future-africa" component={AfricaFuturePage} />
      <Route path="/capabilities" component={CapabilitiesPage} />
      <Route path="/articles" component={ArticlesPage} />
      <Route path="/docs" component={DocsPage} />
      <Route path="/activity" component={ActivityPage} />
      <Route path="/explore/:slug" component={ExplorerPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

const usePagesLocation: BrowserLocationHook = (options) => {
  const [location, navigate] = useBrowserLocation(options);
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const currentLocation = base && location.startsWith(base) ? location.slice(base.length) || "/" : location;
  const navigateWithinPages: typeof navigate = (target, navigationOptions) => {
    const destination = typeof target === "string" ? target : target.toString();
    return navigate(`${base}${destination.startsWith("/") ? destination : `/${destination}`}`, navigationOptions);
  };
  return [currentLocation, navigateWithinPages];
};

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <WouterRouter hook={usePagesLocation}>
            <Routes />
          </WouterRouter>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
