import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>
        <img src="https://github.com/kiminjo.png" alt="Profile Avatar" class="page-title-avatar" />
        <span>{title}</span>
      </a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.5rem;
  margin: 0;
  font-family: var(--titleFont);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.page-title a {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--dark);
}

.page-title-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin: 0;
  box-shadow: 0 0 0 1px var(--lightgray);
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
