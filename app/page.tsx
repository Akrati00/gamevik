import { getAllFilesFrontMatter } from '@/lib/mdx'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

import Article from '@/components/Article'
import Tag from '@/components/Tag'
import { getAllTags } from '@/lib/tags'
import { PostFrontMatter } from 'types/PostFrontMatter'
import Link from 'next/link'
import FAQ from '@/components/faq'
import Interlink from '@/components/interlinking'
import Interling from '@/components/interlinkingg'

const MAX_DISPLAY = 6

export const getStaticProps: GetStaticProps<{
  posts: PostFrontMatter[]
  tags: Record<string, number>
}> = async () => {
  const [posts, tags] = await Promise.all([getAllFilesFrontMatter('blog'), getAllTags('blog')])

  return { props: { posts, tags } }
}

export default function Home({ posts, tags }: InferGetStaticPropsType<typeof getStaticProps>) {
  const sortedTags = Object.keys(tags)
    .sort((a, b) => tags[b] - tags[a])
    .slice(0, 10)

  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />

      <Interling />

      <section className="px-4  rounded-lg">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Tags</h3>
        {sortedTags.length > 0 && (
          <div className="mt-4 flex flex-wrap">
              {sortedTags.map((tag) => (
          <div key={tag} className="mb-2 mr-2">
                  <Tag text={tag} title={''} description={''} />
                </div>
              ))}
          </div>
        )}
      </section>

      <section className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 py-2">
        {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
          const { slug } = frontMatter
          return (
            <div key={slug} className=" w-full transform transition duration-500 hover:scale-105">
              <Article {...frontMatter} />
            </div>
          )
        })}
      </section>

      <div className="flex justify-center mb-2">
        <Link
          href="/blog"
          className="inline-flex rounded px-4 py-2 font-bold border border-gray-300 shadow-sm dark:border-gray-600 focus:outline-none focus-visible:ring focus-visible:ring-primary-300 hover:shadow-lg hover:scale-105 active:scale-95 motion-safe:transform-gpu motion-reduce:hover:scale-105 motion-reduce:hover:brightness-90 transition duration-200 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-700 text-black dark:text-gray-100 hover:border-green-500 dark:hover:shadow-green-500/50"
          aria-label="More articles"
        >
          <span className="mr-2">More articles</span>
          <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
          >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
          </svg>
        </Link>
      </div>

      <FAQ />

     
    </>
  )
}