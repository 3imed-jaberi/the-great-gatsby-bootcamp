const path = require('path');

module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = path.basename(node.fileAbsolutePath, '.md')

    // generate slug for eash posts (gatsby.md -> gatsby ) ..
    createNodeField({ node, name: 'slug', value: slug });
  }
};

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // 1. Get path to template 
  const blogTemplate = path.resolve('./src/templates/blog.js');

  // 2. Get md data
  const response = await graphql(`
    query { 
      allMarkdownRemark { 
        edges { 
          node { 
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  // 3. Create new pages ..
  response.data.allMarkdownRemark.edges.forEach(edge => {
    createPage({
      component: blogTemplate, // path to component .. 
      path: `/blog/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug // data passed !
      }
    })
  });
}
