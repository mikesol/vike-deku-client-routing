module Vike.ClientRouting.Types where


import Deku.Core (Nut)

-- type App = Effect { unsub :: Effect Unit, route :: Poll String, cache :: SSROutput }

type Page = Array Nut
type Layout = Array Nut -> Nut