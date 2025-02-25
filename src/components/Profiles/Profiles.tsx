import { Link, useSearchParams } from "react-router-dom";

import "./Profiles.css";
import { Skeleton } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { clearFilter } from "../Filter/Filter";
import { useCallback, useContext, useEffect, useState } from "react";
import { FilterContext } from "../Filter/FilterContext";

export function Profiles() {
  const { filtrado, isLoading } = useContext(FilterContext);
  const [_, setSearchParams] = useSearchParams();
  const [visibleProfiles, setVisibleProfiles] = useState<typeof filtrado>([]);
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 20;

  const loadMoreProfiles = useCallback(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setVisibleProfiles((prev) => [
      // ...prev,
      ...(filtrado?.slice(0, endIndex) || []),
    ]);
    setPage((prevPage) => prevPage + 1);
  }, [page, filtrado]);

  useEffect(() => {
    setVisibleProfiles([]);
    setPage(1);
    loadMoreProfiles();
  }, [filtrado]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMoreProfiles();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreProfiles]);
  return (
    <>
      <ul className="profiles">
        {isLoading ? (
          [...Array(6).keys()].map((e) => {
            return (
              <li key={e}>
                <Skeleton
                  key={e}
                  width={"100%"}
                  height={"100%"}
                  loading={isLoading}
                >
                  <div className="card">
                    <img src="" loading="lazy" />
                    <div className="infoCard">
                      <div className="">{}</div>
                      <div className="">
                        {} - {}
                      </div>
                    </div>
                  </div>
                </Skeleton>
              </li>
            );
          })
        ) : visibleProfiles?.length === 0 ? (
          <div className="nullProfile">
            <h1 className="message">
              Nenhuma Review foi encontrada
              <br />
              Deseja Limpar o filtro de pesquisa?
            </h1>
            <br />
            <button
              onClick={() => clearFilter(setSearchParams)}
              className="clearFilter"
            >
              Sim
            </button>
          </div>
        ) : (
          visibleProfiles?.map((e) => (
            <li key={e._id} className="item">
              <Link to={`/profile/${e._id}`}>
                <div className="card">
                  <img src={e.picture} />
                  <div className="infoCard">
                    <div className="">{e.name}</div>
                    <div className="">
                      {/* fix this code for "e.local" in backendreturn */}
                      {!!e.local?.uf && (
                        <>
                          {e.local?.uf} - {e.local?.city}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))
        )}
      </ul>
    </>
  );
}
