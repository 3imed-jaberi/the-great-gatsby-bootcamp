import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

import Layout from '../components/layout';
import blogStyles from './blog.module.scss';

const BlogPage = () => {
  const posts = useStaticQuery(graphql`
    query { 
      allMarkdownRemark { 
        edges { 
          node { 
            frontmatter { 
              title
              date
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  // console.log(posts);
  return (
    <Layout>
      <h1>Blog Page !</h1>
      <ol className={blogStyles.posts}>
        {
          posts.allMarkdownRemark.edges.map(edge => {
            return (
              <li className={blogStyles.post}>
                <Link to={`/blog/${edge.node.fields.slug}`}>
                  <h2>{edge.node.frontmatter.title}</h2>
                  <p>{edge.node.frontmatter.date}</p>
                </Link>
              </li>
            )
          })
        }
      </ol>
    </Layout>
  )
};

export default BlogPage;
