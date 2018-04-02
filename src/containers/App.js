import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import { withStyles } from 'material-ui'

import { Header, Sidebar, Footer } from 'components'

import appRoutes from 'routes/app'

import appStyle from 'variables/styles/appStyle'

import image from 'assets/img/sidebar-2.jpg'
import logo from 'assets/img/reactlogo.png'

const switchRoutes = (
  <Switch>
    {appRoutes.map((prop, key) => {
      if (prop.redirect) return <Redirect from={prop.path} to={prop.to} key={key} />
      return <Route path={prop.path} component={prop.component} key={key} />
    })}
  </Switch>
)

// const switchRoutes = <div>switchRoutes</div>

class App extends React.Component {
  state = {
    mobileOpen: false,
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  componentDidUpdate() {
    this.refs.mainPanel.scrollTop = 0
  }
  render() {
    const { classes, ...rest } = this.props
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={appRoutes}
          logoText="数据驾驶舱"
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            routes={appRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(appStyle)(App)
