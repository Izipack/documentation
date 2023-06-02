import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import { Hero } from '@/components/Hero'
import { MobileNavigation } from '@/components/MobileNavigation'
import { Navigation } from '@/components/Navigation'
import { Prose } from '@/components/Prose'
import { Search } from '@/components/Search'
import { ThemeSelector } from '@/components/ThemeSelector'
import CompanyLogo from './CompanyLogo'
import SmallLogo from './SmallLogo'

const navigation = [
  {
    title: 'Introduction',
    links: [
      { title: 'Getting started', href: '/' },
    ],
  },
  {
    title: 'Shipping API',
    links: [
      { title: 'Authenticating', href: '/docs/shippingapi-authenticating' },
      { title: 'Sending packages', href: '/docs/shippingapi-gettingstarted' },
      { title: 'Return orders', href: '/docs/shippingapi-returnpackages' },
    ],
  },
]

function SwaggerIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="#85EA2D" d="M127.999 249.895c-67.215 0-121.9-54.68-121.9-121.896C6.1 60.782 60.785 6.102 128 6.102c67.214 0 121.899 54.685 121.899 121.9c0 67.214-54.685 121.893-121.9 121.893Z" /><path fill="#173647" d="M127.999 12.202c63.954 0 115.797 51.842 115.797 115.797c0 63.952-51.843 115.797-115.797 115.797c-63.952 0-115.797-51.845-115.797-115.797S64.047 12.202 127.999 12.202m0-12.202C57.419 0 0 57.42 0 127.999s57.42 127.998 127.999 127.998S256 198.577 256 128C256 57.419 198.578 0 127.999 0Z" /><path fill="#173647" d="M80.598 86.619c-.394 4.38.146 8.909-.146 13.338c-.345 4.431-.887 8.811-1.773 13.192c-1.23 6.25-5.12 10.976-10.482 14.914c10.436 6.793 11.616 17.324 12.304 28.006c.345 5.76.197 11.567.788 17.276c.443 4.429 2.165 5.562 6.745 5.708c1.87.048 3.786 0 5.956 0v13.683c-13.535 2.313-24.708-1.525-27.467-12.992c-.887-4.184-1.478-8.467-1.673-12.798c-.297-4.578.195-9.155-.148-13.732c-.985-12.553-2.61-16.785-14.618-17.376v-15.602a23.714 23.714 0 0 1 2.608-.443c6.596-.345 9.4-2.364 10.828-8.86c.69-3.641 1.084-7.333 1.23-11.074c.494-7.136.297-14.42 1.525-21.507C67.997 68.163 74.3 63.24 84.785 62.65c2.952-.149 5.955 0 9.35 0v13.98c-1.427.1-2.658.294-3.937.294c-8.515-.297-8.96 2.607-9.6 9.695Zm16.39 32.386h-.196c-4.923-.245-9.155 3.593-9.403 8.515c-.246 4.972 3.592 9.206 8.515 9.45h.59c4.875.296 9.056-3.447 9.352-8.319v-.491c.1-4.971-3.886-9.055-8.857-9.155Zm30.862 0c-4.774-.148-8.763 3.593-8.909 8.318c0 .297 0 .543.051.837c0 5.365 3.641 8.812 9.155 8.812c5.414 0 8.812-3.544 8.812-9.106c-.051-5.366-3.646-8.91-9.109-8.86Zm31.602 0c-5.02-.1-9.206 3.89-9.352 8.91a9.03 9.03 0 0 0 9.055 9.054h.1c4.528.788 9.106-3.592 9.402-8.858c.243-4.874-4.186-9.106-9.205-9.106Zm43.363.737c-5.711-.245-8.567-2.164-9.992-7.581a54.874 54.874 0 0 1-1.624-10.582c-.395-6.596-.346-13.241-.789-19.837c-1.033-15.651-12.352-21.114-28.794-18.41V76.92c2.607 0 4.626 0 6.645.049c3.495.048 6.153 1.379 6.496 5.268c.345 3.543.345 7.136.69 10.73c.692 7.139 1.083 14.372 2.314 21.41c1.085 5.809 5.07 10.14 10.04 13.684c-8.71 5.857-11.27 14.223-11.714 23.626c-.245 6.448-.394 12.944-.736 19.443c-.297 5.905-2.362 7.824-8.318 7.972c-1.674.05-3.298.198-5.169.297v13.93c3.495 0 6.694.196 9.892 0c9.942-.592 15.947-5.415 17.918-15.063a125.582 125.582 0 0 0 1.476-16.045c.343-4.923.297-9.894.788-14.766c.737-7.63 4.232-10.78 11.862-11.27c.739-.1 1.427-.246 2.118-.492v-15.604c-1.282-.149-2.17-.295-3.103-.346Z" /></svg>
  )
}

function Header({ navigation }) {
  let [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll, { passive: true })
    }
  }, [])

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 flex flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 dark:shadow-none sm:px-6 lg:px-8',
        isScrolled
          ? 'dark:bg-slate-900/95 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75'
          : 'dark:bg-transparent'
      )}
    >
      <div className="mr-6 flex lg:hidden">
        <MobileNavigation navigation={navigation} />
      </div>
      <div className="relative flex flex-grow basis-0 items-center">
        <Link href="/" aria-label="Home page">
          <SmallLogo className="h-9 w-9 lg:hidden" />
          <CompanyLogo className="hidden h-9 w-auto lg:block" />
        </Link>
      </div>
      <div className="-my-5 mr-6 sm:mr-8 md:mr-0">
        <Search />
      </div>
      <div className="relative flex basis-0 justify-end gap-6 sm:gap-8 md:flex-grow">
        <ThemeSelector className="relative z-10" />
        <Link href="https://shipping-api.izipack.nl/index.html" className="group" aria-label="GitHub">
          <SwaggerIcon className="h-6 w-6 fill-slate-400 group-hover:fill-slate-500 dark:group-hover:fill-slate-300" />
        </Link>
      </div>
    </header>
  )
}

function useTableOfContents(tableOfContents) {
  let [currentSection, setCurrentSection] = useState(tableOfContents[0]?.id)

  let getHeadings = useCallback((tableOfContents) => {
    return tableOfContents
      .flatMap((node) => [node.id, ...node.children.map((child) => child.id)])
      .map((id) => {
        let el = document.getElementById(id)
        if (!el) return

        let style = window.getComputedStyle(el)
        let scrollMt = parseFloat(style.scrollMarginTop)

        let top = window.scrollY + el.getBoundingClientRect().top - scrollMt
        return { id, top }
      })
  }, [])

  useEffect(() => {
    if (tableOfContents.length === 0) return
    let headings = getHeadings(tableOfContents)
    function onScroll() {
      let top = window.scrollY
      let current = headings[0].id
      for (let heading of headings) {
        if (top >= heading.top) {
          current = heading.id
        } else {
          break
        }
      }
      setCurrentSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll, { passive: true })
    }
  }, [getHeadings, tableOfContents])

  return currentSection
}

export function Layout({ children, title, tableOfContents }) {
  let router = useRouter()
  let isHomePage = router.pathname === '/'
  let allLinks = navigation.flatMap((section) => section.links)
  let linkIndex = allLinks.findIndex((link) => link.href === router.pathname)
  let previousPage = allLinks[linkIndex - 1]
  let nextPage = allLinks[linkIndex + 1]
  let section = navigation.find((section) =>
    section.links.find((link) => link.href === router.pathname)
  )
  let currentSection = useTableOfContents(tableOfContents)

  function isActive(section) {
    if (section.id === currentSection) {
      return true
    }
    if (!section.children) {
      return false
    }
    return section.children.findIndex(isActive) > -1
  }

  return (
    <>
      <Header navigation={navigation} />

      {isHomePage && <Hero />}

      <div className="relative mx-auto flex max-w-8xl justify-center sm:px-2 lg:px-8 xl:px-12">
        <div className="hidden lg:relative lg:block lg:flex-none">
          <div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden" />
          <div className="absolute top-16 bottom-0 right-0 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
          <div className="absolute top-28 bottom-0 right-0 hidden w-px bg-slate-800 dark:block" />
          <div className="sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto overflow-x-hidden py-16 pl-0.5">
            <Navigation
              navigation={navigation}
              className="w-64 pr-8 xl:w-72 xl:pr-16"
            />
          </div>
        </div>
        <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
          <article>
            {(title || section) && (
              <header className="mb-9 space-y-1">
                {section && (
                  <p className="font-display text-sm font-medium text-emerald-500">
                    {section.title}
                  </p>
                )}
                {title && (
                  <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
                    {title}
                  </h1>
                )}
              </header>
            )}
            <Prose>{children}</Prose>
          </article>
          <dl className="mt-12 flex border-t border-slate-200 pt-6 dark:border-slate-800">
            {previousPage && (
              <div>
                <dt className="font-display text-sm font-medium text-slate-900 dark:text-white">
                  Previous
                </dt>
                <dd className="mt-1">
                  <Link
                    href={previousPage.href}
                    className="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                  >
                    <span aria-hidden="true">&larr;</span> {previousPage.title}
                  </Link>
                </dd>
              </div>
            )}
            {nextPage && (
              <div className="ml-auto text-right">
                <dt className="font-display text-sm font-medium text-slate-900 dark:text-white">
                  Next
                </dt>
                <dd className="mt-1">
                  <Link
                    href={nextPage.href}
                    className="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                  >
                    {nextPage.title} <span aria-hidden="true">&rarr;</span>
                  </Link>
                </dd>
              </div>
            )}
          </dl>
        </div>
        <div className="hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
          <nav aria-labelledby="on-this-page-title" className="w-56">
            {tableOfContents.length > 0 && (
              <>
                <h2
                  id="on-this-page-title"
                  className="font-display text-sm font-medium text-slate-900 dark:text-white"
                >
                  On this page
                </h2>
                <ol role="list" className="mt-4 space-y-3 text-sm">
                  {tableOfContents.map((section) => (
                    <li key={section.id}>
                      <h3>
                        <Link
                          href={`#${section.id}`}
                          className={clsx(
                            isActive(section)
                              ? 'text-emerald-500'
                              : 'font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                          )}
                        >
                          {section.title}
                        </Link>
                      </h3>
                      {section.children.length > 0 && (
                        <ol
                          role="list"
                          className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400"
                        >
                          {section.children.map((subSection) => (
                            <li key={subSection.id}>
                              <Link
                                href={`#${subSection.id}`}
                                className={
                                  isActive(subSection)
                                    ? 'text-emerald-500'
                                    : 'hover:text-slate-600 dark:hover:text-slate-300'
                                }
                              >
                                {subSection.title}
                              </Link>
                            </li>
                          ))}
                        </ol>
                      )}
                    </li>
                  ))}
                </ol>
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  )
}
