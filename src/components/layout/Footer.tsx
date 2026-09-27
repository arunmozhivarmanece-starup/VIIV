import { footer, site } from "@/content/site";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  const socials = Object.entries(site.social).filter(([, url]) => url);
  return (
    <footer id="site-footer" className="bg-ink pt-16 pb-24 text-paper md:pb-12">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo dark />
            <p className="mt-5 max-w-sm text-muted-dark">
              A career-skills platform for the business side of tech. {site.tagline}
            </p>
            {socials.length > 0 && (
              <ul className="mt-6 flex gap-3">
                {socials.map(([name, url]) => (
                  <li key={name}>
                    <a href={url} className="text-sm capitalize text-muted-dark hover:text-paper" rel="noopener noreferrer" target="_blank">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted-dark">{col.title}</h2>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className="text-sm text-paper/85 hover:text-accent-bright">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-ink-line pt-8 text-xs leading-relaxed text-muted-dark">
          <p>
            VIIV provides training, practice and career-readiness support. We do not guarantee jobs, placements or
            salaries. Career outcomes depend on individual effort, role, location and market conditions.
          </p>
          <p className="mt-4">
            © {year} {site.fullBrand}. {site.brand} is an initiative of {site.legalName}.
          </p>
        </div>
      </div>
    </footer>
  );
}
