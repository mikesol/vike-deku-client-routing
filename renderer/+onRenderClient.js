export { onRenderClient };

import { hydrate } from "../output/Vike.ClientRouting.Run";
import { layout } from "../output/Vike.ClientRouting.Renderer.Layout";

let dekuRoute;

async function onRenderClient(pageContext) {
  if (pageContext.isHydration) {
    // discards unsubscribe
    const { route } = hydrate(pageContext.dekuHydrationData)(layout)(pageContext.Page)();
    dekuRoute = route;
  } else {
    dekuRoute(pageContext.Page)();
  }
}
