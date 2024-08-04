module Vike.ClientRouting.Run where

import Prelude

import Data.Either (either)
import Data.Tuple.Nested ((/\))
import Deku.Core (Nut, fixed)
import Deku.Effect (useState)
import Deku.Hooks (cycle)
import Deku.Toplevel (SSROutput, hydrateInBody, ssrInBody)
import Effect (Effect)
import Effect.Exception (throw)
import Foreign (Foreign)
import Vike.ClientRouting.Types (Layout, Page)
import Yoga.JSON (read, writeImpl)

vike
  :: forall a b
   . (Nut -> Effect a)
  -> ( { out :: a
       , route :: Array Nut -> Effect Unit
       }
       -> Effect b
     )
  -> Layout
  -> Page
  -> Effect b
vike f c layout page = do
  route /\ content <- useState page
  out <- f $ layout [ cycle (fixed <$> content) ]
  c { out, route }

ssr :: Layout -> Page -> Effect Foreign
ssr = vike ssrInBody \{ out } -> pure $ writeImpl out

hydrate :: Foreign -> Layout -> Page -> Effect { route :: Page -> Effect Unit, unsub :: Effect Unit }
hydrate json layout page = do
  parsed :: SSROutput <- either (throw <<< show) pure $ read json
  vike (hydrateInBody parsed)
    (\{ out: unsub, route } -> pure $ { route, unsub })
    layout
    page
