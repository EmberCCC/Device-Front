import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { isEmpty } from 'lodash';
import { ContainerQuery } from 'react-container-query';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import Menu from './Menu';
import GlobalHeader from 'components/GlobalHeader';
import GlobalCrumbs from 'components/GlobalCrumbs';
import Context from './AllContext';
import { Media_Query, s_size, m_size, l_size } from 'constants/configs';
import { Layout, Drawer,Select } from 'antd';


import { judgeIsMobile } from 'utils/dataTools';
import ErrorNotFound from './ErrorNotFound';
import './index.less';
import GlobalModal from 'components/GlobalModal';

const { Content } = Layout;
const { Option } = Select;
@withRouter
@inject('HomeStore')
@observer
class HomeLayout extends Component {
  state = {
    collapsed: false,
    firstMount: false
  };

  render() {
    const isHome = window.location.pathname === '/index';
    // const isMobile = judgeIsMobile(this.props.type).toString();
    const isMobile = false;
    const { size_class, } = toJS(this.props.HomeStore);
    const isAuth = true;
    const layout = <Layout className='home_layout'>
      {
        isAuth && !isHome && (size_class === 's_size' ?
          <Drawer
            visible={this.state.firstMount ? false : !this.props.HomeStore.collapsed}
            placement="left"
            onClose={this.toggle}
            width='200px'
            style={{
              padding: 0,
              height: '100vh',
            }}
            bodyStyle={{
              height: '100%',
              padding: '0'
            }}
          >
            <Menu sizetype={size_class} mobile={isMobile} />
          </Drawer>
          : <Menu sizetype={size_class} mobile={isMobile} />)
      }
      <Layout className='right_layout'>
        <GlobalHeader
          isAuth={isAuth}
          sizetype={size_class}
          mobile={isMobile}
          ishome={isHome}
          dataSource={toJS(this.props.HomeStore.crumbsList)}
          backToLogin={this.backToLogin}
          visible={this.props.HomeStore.collapsed} toggle={this.toggle} />
        <Content
          style={{
            margin: '8px', padding: 15, background: '#fff', minHeight: 280,
            overflowY: 'auto', position: 'relative'
          }}
          id='home_content'
          mobile={isMobile}
        >
          {(isAuth ? this.props.children : <ErrorNotFound />)}
        </Content>
      </Layout>
    </Layout>;
    return (
      <div id='Assets'>
        <ContainerQuery query={Media_Query}>
          {params => {
            this.getMediaQuery(params);
            return <Context.Provider value={this.getContext()}>
              <div className={classnames(params)}>
                {layout}
              </div>
            </Context.Provider>
          }}
        </ContainerQuery>
        
      </div>
    );
  }
  backToLogin = () => {
    sessionStorage.clear();
    this.props.history.push('/login')
  }
  getMediaQuery = (params) => {
    let current;
    for (let key in params) {
      if (params[key]) {
        current = key;
      }
    }
    if (s_size.includes(current)) {
      this.props.HomeStore.changeValue('size_class', 's_size');
    } else if (m_size.includes(current)) {
      this.props.HomeStore.changeValue('size_class', 'm_size');
    } else if (l_size.includes(current)) {
      this.props.HomeStore.changeValue('size_class', 'l_size');
    }
  }
  getContext = () => {
    const { location, breadcrumbNameMap } = this.props;
    return {
      location,
      breadcrumbNameMap,
      ...this.props
    };
  }
  getLastMenu = () => {
    let list = sessionStorage.getItem('menu') || [];
    if (!isEmpty(list))
      list = JSON.parse(list).reverse();
    return list || [];
  }

  toggle = () => {
    this.props.HomeStore.changeValue('collapsed', !this.props.HomeStore.collapsed);
    this.props.HomeStore.changeValue('isClickCollapsed', true);
  }
  toggleMenu = (actionId) => {
    this.props.HomeStore.toggleMenu({ actionId }, (url) => {
      if (url) {
        this.props.history.push(url);
      } else {
        alert('false');
      }
    });
  }
  static getDerivedStateFromProps(props, state) {
    return {
      firstMount: false,
    }
  }
  componentDidMount() {
    this.setState({
      firstMount: true
    });
    /* 进入即请求菜单 */
    if (this.props.history.location.pathname !== '/login') {
      this.props.HomeStore.getMenuList().then((url) => {
        if (this.props.history.location.pathname.indexOf('index') === -1) {
          this.props.history.push(url)
          this.props.HomeStore.initMenu(this.props.history.location.pathname)
        }
      })
    }
  }
}
export default HomeLayout;