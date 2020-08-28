import React from "react"
import { graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Img from "gatsby-image"
import Layout from "../components/Layout"
import Head from "../components/head"


import SEO from "../components/SEO"

export const query = graphql`
  query($slug: String!) {
    contentfulProduct(slug: { eq: $slug }) {
      title
      media {
        fixed(width: 300, height: 300) {
          base64
          src
          srcSet
          height
          width
        }
        file{
          url
        }
      }
      body {
        json
      }
    }
  }
`

const Blog = props => {
  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        const alt = node.data.target.fields.title["en-US"]
        const url = node.data.target.fields.file["en-US"].url
        return <img alt={alt} src={url} />
      },
    },
  }

  return (
    <Layout>
      <Head title={props.data.contentfulProduct.title} />
      <h1>{props.data.contentfulProduct.title}</h1>
      <Img 
        fixed={props.data.contentfulProduct.media.fixed}/>
      {documentToReactComponents(
        props.data.contentfulProduct.body.json,
        options
      )}
    </Layout>
  )
}

export default Blog