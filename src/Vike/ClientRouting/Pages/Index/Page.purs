module Vike.ClientRouting.Pages.Index.Page where


import Deku.DOM as D
import Vike.ClientRouting.Pages.Index.Counter (counter)
import Vike.ClientRouting.Types (Page)

page :: Page
page =
  [ D.h1__ "Welcome"
  , D.text_ "This page is:"
  , D.ul []
      [ D.li [] [ D.text_ "Rendered to HTML." ]
      , D.li []
          [ D.text_ "Interactive. "
          , counter
          ]
      ]
  ]
