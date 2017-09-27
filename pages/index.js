import React from 'react'
import Layout from 'components/Layout'
import styled from 'styled-components'
import withRedux from 'next-redux-wrapper'
import initStore from 'redux/store'
import withAuth from '../helpers/withAuth'
import Preview from '../features/Post/Preview'
import map from 'lodash/map'
import { getSortedAndPublishedPosts } from 'redux/selector/posts'
import { withData } from 'helpers/withData'

class Index extends React.Component {
  static async getInitialProps({ store }) {
    await withData(store)
  }

  getMeta = () => {
    return {
      title: 'Ололось блог',
      description:
        'Совместный блог о путешествиях Андрея Лося aka @RIP212 и Лины Олейник',
    }
  }

  render() {
    return (
      <Layout topPadding="0em" meta={this.getMeta()}>
        <Masthead>
          <Logo>
            <p>
              <img alt="logo" src="/static/logo.png" />
            </p>
          </Logo>
          <h1>Ололось блог</h1>
          <h2>
            Совместный блог о путешествиях Андрея Лося aka @RIP212 и Лины
            Олейник
          </h2>
        </Masthead>
        <Thread>
          {map(this.props.posts, post => <Preview key={post.id} post={post} />)}
        </Thread>
      </Layout>
    )
  }
}

export const Masthead = styled.section`
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  padding: 40px 20px;
  color: white;
  text-align: center;
  position: relative;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url('static/cover1.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    opacity: 1;
    z-index: -1;
  }

  h1 {
    font-size: 3em;
  }

  h2 {
    font-size: 1.5em;
    margin: 20px;
  }

  a {
    color: #ddd;
  }

  p {
    margin: 10px;
  }
`

export const Logo = styled.div`
  margin: auto;
  height: 200px;
  width: 200px;
  vertical-align: middle;

  p {
    line-height: 200px;
    margin: 0;
  }

  img {
    width: 75%;
    margin: auto;
  }
`

export const Thread = styled.div`
  margin-top: 2em;
  margin-bottom: 2em;
`

const selector = (state, ownProps) => ({
  posts: getSortedAndPublishedPosts(state),
})

export default withRedux(initStore, selector, {})(withAuth(Index))
