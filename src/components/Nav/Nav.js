import "./styles.scss"
import "./popover.scss"
import {closeNav, closeSearch, toggleSearch} from "./actions"
import {connect} from "react-redux"
import NavItem from "./NavItem/NavItem"
import {openShare} from "../ShareModal/actions"
import Popover from "react-popover"
import PropTypes from "prop-types"
import React from "react"
import SearchPopover from "./SearchPopover/SearchPopover"
import {zoomOut} from "../MapBody/actions"

const Nav = (props) => {
  const searchPopover = <SearchPopover />

  return (
    <div className={props.open ? "nav" : "nav closed"} >
      {/* Close Nav (only on mobile) */}
      <a className="close" onClick={props.closeNav}>
        &times;
      </a>

      {/* Search Location */}
      <Popover
        body={searchPopover}
        className={"searchPopover"}
        isOpen={props.search}
        place="right"
      >
        <NavItem
          clickListener={props.toggleSearch}
          description="Search Location"
          icon="location"
        />
      </Popover>

      {/* Share */}
      <NavItem
        clickListener={props.zoomOut}
        description="Zoom Out"
        icon="globe"
      />

      {/* Github */}
      <NavItem
        description="See Repo"
        icon="mark-github"
        url="https://github.com/mapd/mapd-tweetmap-2"
      />

      {/* About */}
      <NavItem
        description="About"
        icon="info"
        url="https://www.mapd.com"
      />

      {/* Share */}
      <NavItem
        clickListener={props.openShare}
        description="Share"
        icon="link"
      />
    </div>
  )
}

Nav.propTypes = {
  closeNav: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  openShare: PropTypes.func.isRequired,
  search: PropTypes.bool.isRequired,
  toggleSearch: PropTypes.func.isRequired,
  zoomOut: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  open: state.nav.navOpen,
  search: state.nav.locSearchOpen
})

const mapDispatchToProps = (dispatch) => ({
  closeNav: () => {
    dispatch(closeNav)
    dispatch(closeSearch)
  },
  openShare: () => {
    dispatch(openShare)
    dispatch(closeNav)
  },
  toggleSearch: () => { dispatch(toggleSearch) },
  zoomOut: () => {
    dispatch(zoomOut())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
