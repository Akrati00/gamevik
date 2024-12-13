import { useRouter } from 'next/router'
import Link from 'next/link'

const Breadcrumbs = () => {
  const router = useRouter()
  const pathSegments = router.asPath.split('/').filter((segment) => segment)

  if (router.pathname === '/') {
    // Hide the breadcrumbs on the homepage
    return null
  }

  let breadcrumbs = [
    <li key="home">
      <Link href="/" className="rubikaaa link text-sm font-medium text-gray-500">Home</Link>
    </li>,
  ]

  for (let i = 0; i < pathSegments.length; i++) {
    let segment = decodeURIComponent(pathSegments[i]) // Decode the URL segment

    if (segment.startsWith('[')) {
      const slugName = segment.replace(/[[\]']+/g, '')
      const slugValue = router.query[slugName]
      const segmentText = slugValue || slugName

      breadcrumbs.push(
        <li key={segment} className="flex items-center space-x-2">
          <span className="text-gray-400">{'\\'}</span>
          <span className="text-sm font-medium text-gray-500">{segmentText}</span>
        </li>
      )
    } else {
      let segmentText = segment.replace(/-/g, ' ')

      if (i === pathSegments.length - 1 && segment.match(/^[0-9]+$/)) {
        breadcrumbs.push(
          <li key={segment} className="flex items-center space-x-2">
            <span className="text-gray-400">{''}</span>
            <span className="text-sm font-medium text-gray-500">
              {segmentText.replace(/page\s*/, '')}
            </span>
          </li>
        )
      } else if (segment === 'page') {
        breadcrumbs.push(
          <li key={segment} className="flex items-center space-x-2">
            <span className="text-gray-400">{' \\'}</span>
            <span className="rubikaaa text-sm font-medium text-gray-500">{segmentText}</span>
          </li>
        )
      } else {
        const isLastBreadcrumb = i === pathSegments.length - 1

        breadcrumbs.push(
          <li key={segment} className="flex items-center space-x-2">
            <span className="text-gray-400">{'\\'}</span>
            {isLastBreadcrumb ? (
              <span className="text-sm font-medium text-gray-500">{segmentText}</span>
            ) : (
              <Link href={`/${pathSegments.slice(0, i + 1).join('/')}`} className="rubikaaa link text-sm font-medium text-gray-500">{segmentText}</Link>
            )}
          </li>
        )
      }
    }
  }

  return (
    <nav className="overflow-hidden rounded-lg bg-transparent">
      <ul className="flex items-center justify-start space-x-2 px-4 py-2">{breadcrumbs}</ul>
    </nav>
  )
}

export default Breadcrumbs
