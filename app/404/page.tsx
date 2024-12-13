import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'
import Tag from '@/components/Tag'

// Function to get unique categories and tags from blog posts
const getCategoriesAndTags = () => {
  const postsDirectory = path.join(process.cwd(), 'data/blog')
  const filenames = fs.readdirSync(postsDirectory)

  const categoriesSet = new Set<string>()
  const tagsSet = new Set<string>()

  filenames.forEach((filename) => {
    const filePath = path.join(postsDirectory, filename)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContent)

    // Assuming your frontmatter has categories and tags as arrays
    if (data.categories) {
      data.categories.forEach((category: string) => categoriesSet.add(category))
    }
    if (data.tags) {
      data.tags.forEach((tag: string) => tagsSet.add(tag))
    }
  })

  return {
    categories: Array.from(categoriesSet),
    tags: Array.from(tagsSet),
  }
}

export async function getStaticProps() {
  const { categories, tags } = getCategoriesAndTags()

  return {
    props: {
      categories,
      tags,
    },
  }
}

export default function FourZeroFour({ categories, tags }) {
  return (
    <div className="flex flex-col items-start justify-start md:mt-10 md:flex-row md:items-center md:justify-center md:space-x-6">
      <div className="space-x-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:border-r-2 md:px-6 md:text-8xl md:leading-14">
          404
        </h1>
      </div>
      <div className="max-w-md">
      <p className="mb-6 text-3xl font-bold leading-normal md:text-4xl">
          Oops! This page doesn’t exist.
        </p>
        <p className="mb-5 text-lg">
          It seems like you’re lost, but don’t worry! Explore some popular categories and tags below:
        </p>

        <div className="mb-2">
          <h3 className="text-lg font-semibold mb-2 text-">Categories:</h3>
          <div className="flex flex-wrap gap-2 mb-2">
            {categories.map((category) => (
              <Link key={category} href={`/category/${kebabCase(category)}`} className="text-sm font-medium bg-gray-200 dark:bg-white/20 rounded-lg px-3 py-2">
                {category}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Tag key={tag} text={tag} maintitle="" title="" description="" />
            ))}
          </div>
        </div>

        <Link
  href="/"
  className="focus:shadow-outline-blue mt-8 inline-block rounded-lg border border-transparent bg-green-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-green-500"
>
  Return to Home Page
</Link>

      </div>
    </div>
  )
}