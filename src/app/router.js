// import external modules
import React, { Component, Suspense, lazy } from "react";
import history from './history';
import { Router, Switch, Route } from "react-router-dom";
import Spinner from "../components/spinner/spinner";
import {PdfView} from "../views/quotes/pdfView"

// import internal(own) modules
import MainLayoutRoutes from "../layouts/routes/mainRoutes";
import FullPageLayout from "../layouts/routes/fullpageRoutes";
import ErrorLayoutRoute from "../layouts/routes/errorRoutes";

// Main Layout
const LazyGeneral = lazy(() => import("../views/general/general"));
const LazyCreateCompany = lazy(() =>
  import("../views/general/companies/createCompany")
);
const LazyUpdateCompany = lazy(() =>
  import("../views/general/companies/updateCompany")
);
const LazyViewCompany = lazy(() =>
  import("../views/general/companies/viewCompany")
);



const LazyUsers = lazy(() => import("../views/users/users"));
const LazyUser = lazy(() => import("../views/users/user"));
const LazyUserCreate = lazy(() => import("../views/users/usersCreate"));
const LazyCustomers = lazy(() => import("../views/customers/customers"));
const LazyCustomersCreate = lazy(() =>
  import("../views/customers/customersCreate")
);
const LazyLeads = lazy(() => import("../views/leads/leads"));
const LazyLeadCreate = lazy(() => import("../views/leads/leadCreate"));
const LazyLeadView = lazy(() => import("../views/leads/leadView"));
const LazyLeadEdit = lazy(() => import("../views/leads/leadEdit"));
const LazyQuotes = lazy(() => import("../views/quotes/quotes"));
const LazyQuotesCreate = lazy(() => import("../views/quotes/quoteCreate"));
const LazyQuotesView = lazy(() => import("../views/quotes/quoteView"));
const LazyQuotesEdit = lazy(() => import("../views/quotes/quoteEdit"));
const LazyQuotesViewProducts = lazy(() =>
  import("../views/quotes/viewAllProducts")
);

const LazyProducts = lazy(() => import("../views/products/products"));
const LazyProductItem = lazy(() => import("../views/products/productItem"));
const LazyProductCategories = lazy(() =>
  import("../views/products/productCategories")
);
const LazyProductViewallCategories = lazy(() =>
  import("../views/products/productViewallCategories")
);
const LazyAverageCost = lazy(() => import("../views/products/averageCost"));
const LazyCustomersView = lazy(() =>
  import("../views/customers/customersView")
);
const LazyCustomersEdit = lazy(() => import("../views/customers/customerEdit"));
const LazyProjects = lazy(() => import("../views/projects/projects"));
const LazyProjectsCreate = lazy(() =>
  import("../views/projects/projectsCreate")
);
const LazyProjectsView = lazy(() => import("../views/projects/projectsView"));
const LazyProjectsEdit = lazy(() => import("../views/projects/projectsEdit"));
const LazyProjectsMap = lazy(() => import("../views/projects/projectsMap"));
const LazyProjectRequirement = lazy(() =>
  import("../views/projects/projectRequirement")
);
const LazyProjectsMapSingle = lazy(() =>
  import("../views/projects/projectsMapSingle")
);
const LazyEcommerceDashboard = lazy(() =>
  import("../views/dashboard/ecommerceDashboard")
);
const LazyAnalyticsDashboard = lazy(() =>
  import("../views/dashboard/analyticsDashboard")
);
const LazySalesDashboard = lazy(() =>
  import("../views/dashboard/salesDashboard")
);
const LazyEmail = lazy(() => import("../views/email/email"));
const LazyChat = lazy(() => import("../views/chat/chat"));
const LazyContacts = lazy(() => import("../views/contacts/contacts"));
const LazyTodo = lazy(() => import("../views/todo/todo"));
const LazyCalender = lazy(() => import("../views/calender/calender"));
const LazyGrid = lazy(() => import("../views/ui-kit/grid"));
const LazyTypography = lazy(() => import("../views/ui-kit/typography"));
const LazySyntaxHighlighter = lazy(() =>
  import("../views/ui-kit/syntaxHighlighter")
);
const LazyHelperClasses = lazy(() => import("../views/ui-kit/helperClasses"));
const LazyTextUtility = lazy(() => import("../views/ui-kit/textUtility"));
const LazyFeather = lazy(() => import("../views/ui-kit/feather"));
const LazyColorPallete = lazy(() =>
  import("../views/colorPalletes/colorPallete")
);
const LazyLists = lazy(() => import("../views/components/reactstrap/lists"));
const LazyButton = lazy(() => import("../views/components/reactstrap/buttons"));
const LazyBreadcrumbs = lazy(() =>
  import("../views/components/reactstrap/breadcrumbs")
);
const LazyAlerts = lazy(() => import("../views/components/reactstrap/alerts"));
const LazyBadges = lazy(() => import("../views/components/reactstrap/badges"));
const LazyDropdowns = lazy(() =>
  import("../views/components/reactstrap/dropdowns")
);
const LazyTabs = lazy(() => import("../views/components/reactstrap/tabs"));
const LazyInputGroups = lazy(() =>
  import("../views/components/reactstrap/inputGroups")
);
const LazyMediaObjects = lazy(() =>
  import("../views/components/reactstrap/mediaObjects")
);
const LazyPagination = lazy(() =>
  import("../views/components/reactstrap/pagination")
);
const LazyProgressBars = lazy(() =>
  import("../views/components/reactstrap/progressBars")
);
const LazyModals = lazy(() => import("../views/components/reactstrap/modals"));
const LazyCollapse = lazy(() =>
  import("../views/components/reactstrap/collapse")
);
const LazyTooltips = lazy(() =>
  import("../views/components/reactstrap/tooltips")
);
const LazyPopover = lazy(() =>
  import("../views/components/reactstrap/popover")
);
const LazySelect = lazy(() => import("../views/components/extra/select"));
const LazySlider = lazy(() => import("../views/components/extra/slider"));
const LazyUpload = lazy(() => import("../views/components/extra/upload"));
const LazyEditor = lazy(() => import("../views/components/extra/editor"));
const LazyDragAndDrop = lazy(() =>
  import("../views/components/extra/dragAndDrop")
);
const LazyInputTags = lazy(() => import("../views/components/extra/inputTags"));
const LazySwitches = lazy(() => import("../views/components/extra/switches"));
const LazyToastr = lazy(() => import("../views/components/extra/toastr"));
const LazyInputs = lazy(() => import("../views/forms/elements/inputs"));
const LazyInputGrids = lazy(() => import("../views/forms/elements/inputGrids"));
const LazyBasicForms = lazy(() => import("../views/forms/layouts/basicForms"));
const LazyBorderedForms = lazy(() =>
  import("../views/forms/layouts/borderedForms")
);
const LazyFormActions = lazy(() =>
  import("../views/forms/layouts/formActions")
);
const LazyHiddenLabels = lazy(() =>
  import("../views/forms/layouts/hiddenLabels")
);
const LazyHorizontalForms = lazy(() =>
  import("../views/forms/layouts/horizontalForms")
);
const LazyValidation = lazy(() => import("../views/forms/validation"));
const LazyStripedRows = lazy(() =>
  import("../views/forms/layouts/stripedRows")
);
const LazyWizard = lazy(() => import("../views/forms/wizard"));
const LazyRegular = lazy(() => import("../views/tables/regular"));
const LazyExtended = lazy(() => import("../views/tables/extended"));
const LazyReactTableExtended = lazy(() =>
  import("../views/tables/reactTableExtended")
);
const LazyBasicCard = lazy(() => import("../views/cards/basicCard"));
const LazyExtendedCard = lazy(() => import("../views/cards/extendedCard"));
const LazyStatisticCard = lazy(() => import("../views/cards/statisticCard"));
const LazyAdvancedCard = lazy(() => import("../views/cards/advancedCard"));
const LazyChartist = lazy(() => import("../views/charts/chartist/chartist"));
const LazyChart = lazy(() => import("../views/charts/chartjs/chart"));
const LazyGoogle = lazy(() => import("../views/maps/google"));
const LazyHorizontalTimeline = lazy(() =>
  import("../views/pages/horizontalTimeline")
);
const LazyVerticalTimeline = lazy(() =>
  import("../views/pages/verticalTimeline")
);
const LazyUserProfile = lazy(() => import("../views/pages/userProfile"));
const LazyInvoice = lazy(() => import("../views/pages/invoice"));
const LazyGallery = lazy(() => import("../views/pages/gallery"));
const LazyFAQ = lazy(() => import("../views/pages/faq"));
const LazyKnowledgeBase = lazy(() => import("../views/pages/knowledgeBase"));
const LazySearch = lazy(() => import("../views/pages/search"));
const LazyBlankPage = lazy(() => import("../views/pages/blankPage"));
const LazyChangeLogPage = lazy(() => import("../views/pages/changeLogPage"));

// Full Layout
const LazyForgotPassword = lazy(() => import("../views/pages/forgotPassword"));
const LazyLogin = lazy(() => import("../views/login/login"));
const LazyRegister = lazy(() => import("../views/pages/register"));
const LazyMaintainance = lazy(() => import("../views/pages/maintainance"));
const LazyLockScreen = lazy(() => import("../views/pages/lockScreen"));

// Error Pages
const LazyErrorPage = lazy(() => import("../views/pages/error"));

class Routes extends Component {
  render() {
    return (
      // Set the directory path if you are deplying in sub-folder
      <Router history={history}>
        <Switch>
          <Route exact path="/quote/pdf" component={PdfView} />
          <FullPageLayout
            exact
            path="/"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyLogin {...matchprops} />
              </Suspense>
            )}
          />
          {/* Dashboard Views */}
          <MainLayoutRoutes
            exact
            path="/general"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyGeneral {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/create-company"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyCreateCompany {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/company/:companyID"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyViewCompany {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/update-company/:companyID"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyUpdateCompany {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/users"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyUsers {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/user/:userId"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyUser {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/users-create"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyUserCreate {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/customers"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyCustomers {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/customers-create"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyCustomersCreate {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/customers-view/:customerId"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyCustomersView {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/customers-edit/:customerId"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyCustomersEdit {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/projects"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyProjects {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/projects-create"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyProjectsCreate {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/projects-view/:projectId"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyProjectsView {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/projects-edit/:projectId"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyProjectsEdit {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/projects-map"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyProjectsMap {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/projects-map-single/:projectId"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyProjectsMapSingle {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/projects-requirement"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyProjectRequirement {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/dashboard"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyEcommerceDashboard {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/leads"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyLeads {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/lead-create"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyLeadCreate {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/lead-view/:leadId"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyLeadView {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/lead-edit/:leadId"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyLeadEdit {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/quotes"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyQuotes {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/quote-create"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyQuotesCreate {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/quote-view/:quoteId"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyQuotesView {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/quote-edit/:quoteId"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyQuotesEdit {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/quote-view-all-products/:quoteId"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyQuotesViewProducts {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/products"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyProducts {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/product-items/:productId"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyProductItem {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/product-categories"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyProductCategories {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/product-view-all-categories"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyProductViewallCategories {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/average-cost"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyAverageCost {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/analytics-dashboard"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyAnalyticsDashboard {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/sales-dashboard"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazySalesDashboard {...matchprops} />
              </Suspense>
            )}
          />
          {/* Single Views */}
          <MainLayoutRoutes
            exact
            path="/colorpalettes"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyColorPallete {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/email"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyEmail {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/chat"
            render={(matchprops) => (
              <Suspense fallback={<div>Loading ...</div>}>
                <LazyChat {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/contacts"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyContacts {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/todo"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyTodo {...matchprops} />
              </Suspense>
            )}
          />
          {/* UIKit Views */}
          <MainLayoutRoutes
            exact
            path="/uikit/grids"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyGrid {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/uikit/typography"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyTypography {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/uikit/syntaxhighlighter"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazySyntaxHighlighter {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/uikit/helperclasses"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyHelperClasses {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/uikit/textutilities"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyTextUtility {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/uikit/feather"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyFeather {...matchprops} />
              </Suspense>
            )}
          />
          {/* Components Views */}
          <MainLayoutRoutes
            exact
            path="/components/bootstrap/lists"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyLists {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/components/bootstrap/buttons"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyButton {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/components/bootstrap/breadcrumbs"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyBreadcrumbs {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/components/bootstrap/alerts"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyAlerts {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/components/bootstrap/badges"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyBadges {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/components/bootstrap/dropdowns"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyDropdowns {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/components/bootstrap/tabs"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyTabs {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/components/bootstrap/input-groups"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyInputGroups {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/components/bootstrap/media-objects"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyMediaObjects {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/components/bootstrap/pagination"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyPagination {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/components/bootstrap/progress-bars"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyProgressBars {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/components/bootstrap/modals"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyModals {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/components/bootstrap/collapse"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyCollapse {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/components/bootstrap/tooltips"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyTooltips {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/components/bootstrap/popover"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyPopover {...matchprops} />
              </Suspense>
            )}
          />

          <MainLayoutRoutes
            exact
            path="/components/extra/select"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazySelect {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/components/extra/slider"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazySlider {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/components/extra/upload"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyUpload {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/components/extra/editor"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyEditor {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/components/extra/drag-and-drop"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyDragAndDrop {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/components/extra/input-tags"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyInputTags {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/components/extra/switches"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazySwitches {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/components/extra/toastr"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyToastr {...matchprops} />
              </Suspense>
            )}
          />
          {/* Forms */}
          <MainLayoutRoutes
            exact
            path="/forms/elements/inputs"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyInputs {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/forms/elements/input-grids"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyInputGrids {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/forms/layouts/basic-forms"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyBasicForms {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/forms/layouts/bordered-forms"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyBorderedForms {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/forms/layouts/form-actions"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyFormActions {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/forms/layouts/hidden-labels"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyHiddenLabels {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/forms/layouts/horizontal-forms"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyHorizontalForms {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/forms/layouts/striped-rows"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyStripedRows {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/forms/validation"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyValidation {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/forms/wizard"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyWizard {...matchprops} />
              </Suspense>
            )}
          />
          {/* Tables */}
          <MainLayoutRoutes
            exact
            path="/tables/regular"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyRegular {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/tables/extended"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyExtended {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/react-tables/regular"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyRegular {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/react-tables/extended"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyReactTableExtended {...matchprops} />
              </Suspense>
            )}
          />

          {/* Cards */}
          <MainLayoutRoutes
            exact
            path="/cards/basic-card"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyBasicCard {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/cards/extended-card"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyExtendedCard {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/cards/statistic-card"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyStatisticCard {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/cards/advanced-card"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyAdvancedCard {...matchprops} />
              </Suspense>
            )}
          />
          {/* Chart Views */}
          <MainLayoutRoutes
            exact
            path="/charts/chartist"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyChartist {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/charts/chartjs"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyChart {...matchprops} />
              </Suspense>
            )}
          />
          {/* Maps Views */}
          <MainLayoutRoutes
            exact
            path="/google-maps"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyGoogle {...matchprops} />
              </Suspense>
            )}
          />

          {/* Saperate Pages Views */}
          <FullPageLayout
            exact
            path="/pages/forgot-password"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyForgotPassword {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/pages/horizontal-timeline"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyHorizontalTimeline {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/pages/vertical-timeline"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyVerticalTimeline {...matchprops} />
              </Suspense>
            )}
          />

          <FullPageLayout
            exact
            path="/pages/register"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyRegister {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/pages/user-profile"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyUserProfile {...matchprops} />
              </Suspense>
            )}
          />
          <FullPageLayout
            exact
            path="/pages/lockscreen"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyLockScreen {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/pages/invoice"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyInvoice {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/pages/blank-page"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyBlankPage {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/pages/change-log"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyChangeLogPage {...matchprops} />
              </Suspense>
            )}
          />
          <FullPageLayout
            exact
            path="/pages/maintenance"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyMaintainance {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/pages/gallery"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyGallery {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/pages/faq"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyFAQ {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/pages/knowledge-base"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyKnowledgeBase {...matchprops} />
              </Suspense>
            )}
          />
          <MainLayoutRoutes
            exact
            path="/pages/search"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazySearch {...matchprops} />
              </Suspense>
            )}
          />
          {/* Calender */}
          <MainLayoutRoutes
            exact
            path="/calendar"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyCalender {...matchprops} />
              </Suspense>
            )}
          />
          <ErrorLayoutRoute
            exact
            path="/pages/error"
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyErrorPage {...matchprops} />
              </Suspense>
            )}
          />

          <ErrorLayoutRoute
            render={(matchprops) => (
              <Suspense fallback={<Spinner />}>
                <LazyErrorPage {...matchprops} />
              </Suspense>
            )}
          />
          
        </Switch>
      </Router>
    );
  }
}

export default Routes;
