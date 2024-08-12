module Vike.Minimal.Pages.Route where

import Deku.Core (Nut, text_)
import Vike.ClientRouting.Pages.About.Page as About
import Vike.ClientRouting.Pages.Index.Page as Index

route :: { urlPathname :: String } -> Array Nut
route { urlPathname } = case urlPathname of
  "/" -> Index.page
  "/about/" -> About.page
  "/about" -> About.page
  _ -> [text_ "Forbidden"]
