require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`
});

const config = require('./siteConfig');

module.exports = {
	siteMetadata: {
		title: config.title,
		description: config.description,
		...config
	},
	plugins: [
		{
			resolve: `gatsby-plugin-gdpr-cookies`,
			options: {
				googleAnalytics: {
					trackingId: process.env.GA, // leave empty if you want to disable the tracker
					cookieName: 'gatsby-gdpr-google-analytics', // default
					anonymize: true, // default
					allowAdFeatures: false // default
				},
				facebookPixel: {
					pixelId: ''
				},
				// Defines the environments where the tracking should be available  - default is ["production"]
				environments: [ 'production', 'development' ]
			}
		},
		{
			resolve: `gatsby-source-contentful`,
			options: {
				spaceId: process.env.CONTENTFUL_SPACE_ID,
				// Learn about environment variables: https://gatsby.dev/env-vars
				accessToken: process.env.CONTENTFUL_ACESS_TOKEN
			}
		},

		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: config.title,
				short_name: config.title,
				start_url: config.siteUrl,
				background_color: config.backgroundColor,
				theme_color: config.themeColor,
				display: 'standalone',
				icon: config.icon
			}
		},
		// {
		// 	resolve: `gatsby-plugin-google-analytics`,
		// 	options: {
		// 		trackingId: process.env.GA,
		// 		head: true,
		// 		anonymize: true
		// 	}
		// },

		'gatsby-plugin-sass',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'src',
				path: `${__dirname}/src/`
			}
		},
		'gatsby-plugin-offline',
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugin: [
					'gatsby-remark-relative-images',
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 750,
							linkImagesToOriginal: false
						}
					}
				]
			}
		}
	]
};
