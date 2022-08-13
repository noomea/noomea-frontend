import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormattedMessage, useIntl } from "react-intl";
import ReactTooltip from "react-tooltip";

function HeaderLinks(props) {
  const { links } = props;
  const route = useRouter();
  const intl = useIntl();
  const activeLink = links.find((link) => link.page === route.pathname);

  const [activeTabIndex, setActiveTabIndex] = useState(activeLink?.id - 1);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const tabsRef = useRef([]);

  useEffect(() => {
    if (!activeLink) return;

    function setTabPosition() {
      const currentTab = tabsRef.current[activeLink.id - 1];
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    }

    setTabPosition();
    window.addEventListener("resize", setTabPosition);

    return () => window.removeEventListener("resize", setTabPosition);
  }, [activeLink, intl.locale]);

  return (
    <div className="relative">
      <ul className="flex text-gray-400 space-x-6 items-center">
        {links.map((link, index) => {
          if (!link.menu.includes("desktop")) return;

          if (link.name) {
            return (
              <li
                key={index}
                ref={(el) => (tabsRef.current[index] = el)}
                onClick={() => setActiveTabIndex(index)}
                className="group"
              >
                <LinkContainer
                  link={link?.page}
                  active={link?.id === activeLink?.id}
                >
                  <FormattedMessage id={link.name} />
                </LinkContainer>
              </li>
            );
          } else {
            return (
              <li key={index} className="cursor-default">
                ·
              </li>
            );
          }
        })}
      </ul>
      {activeLink?.menu.includes("desktop") && (
        <div
          className="absolute -bottom-1 transition-all duration-300"
          style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
        >
          <span className="block mx-auto h-1 w-8 left-4 bg-gradient-to-r from-[#ff439e] via-[#FF5FAC] to-[#FF909F] rounded-lg"></span>
        </div>
      )}
    </div>
  );
}

export default HeaderLinks;

const LinkContainer = (props) => {
  const { link, active, children } = props;
  const intl = useIntl();

  if (link) {
    return (
      <Link href={link} className="-m-2">
        <a
          className={clsx(
            `p-2 inline-block cursor-pointer hover:text-white transition-all`,
            {
              "text-white": active,
            }
          )}
        >
          <div className="group-active:scale-90 transition-all">{children}</div>
        </a>
      </Link>
    );
  } else {
    return (
      <>
        <a
          data-tip={intl.formatMessage({ id: "coming_soon" })}
          className="cursor-not-allowed opacity-50"
        >
          {children}
        </a>
        <ReactTooltip
          place="top"
          type="dark"
          effect="float"
          className="bg-black/50 rounded"
        />
      </>
    );
  }
};
