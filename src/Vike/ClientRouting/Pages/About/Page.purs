module Vike.ClientRouting.Pages.About.Page where


import Deku.DOM as D
import Vike.ClientRouting.Types (Page)

page :: Page
page =
  [ D.h1__ "About "
  , D.p__ "Example of using Vike."
  ]
