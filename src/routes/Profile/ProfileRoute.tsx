"use client";

import { useParams } from "react-router-dom";
import "./ProfileRoute.css";
import { useGetProfile } from "../../services/Querys/Profiles";
import { Skeleton } from "@radix-ui/themes";
import PageTitle from "../../components/PageTitle";

export function ProfileRoute() {
  const params = useParams();
  const id = params?.id;
  const { data, isLoading } = useGetProfile(id);

  console.log(data);

  const formatAddress = () => {
    if (!data?.local) return null;

    const parts = [];
    if (data.local.street) parts.push(data.local.street);
    if (data.local.number) parts.push(data.local.number);
    if (data.local.neighborhood) parts.push(data.local.neighborhood);
    if (data.local.city) parts.push(data.local.city);
    if (data.local.uf) parts.push(data.local.uf);

    return parts.length > 0 ? parts.join(", ") : null;
  };

  return (
    <>
      <PageTitle title={"Perfil"} />
      <div className="up">
        <Skeleton loading={isLoading}>
          <div className="left">
            <img src={data?.picture || "/placeholder.svg"} alt="" />
          </div>
        </Skeleton>
        <Skeleton loading={isLoading}>
          <div className="back"></div>
        </Skeleton>
        <Skeleton loading={isLoading}>
          <div className="rigth">
            {data?.promotion.active && (
              <div className="promotion">
                <span>Produto em promoção: </span>
                <div className="text">{data?.promotion.description}</div>
              </div>
            )}
            <Skeleton loading={isLoading}>
              <div className="info-section">
                <div className="text">
                  {data?.informations != null &&
                    data?.informations
                      .split("\\n")
                      .map((line: string, index: number) => (
                        <span key={index}>
                          {line}
                          <br />
                        </span>
                      ))}
                </div>
              </div>
            </Skeleton>
          </div>
        </Skeleton>
      </div>

      <div className={"bottom"}>
        <Skeleton loading={isLoading}>
          <div className="movie">
            <div className="inside">
              {data?.movie == null ? (
                <div className="noVideo">Video não disponivel</div>
              ) : (
                <iframe
                  className="content"
                  src={data?.movie}
                  style={{ border: "none" }}
                  scrolling="no"
                  loading="lazy"
                ></iframe>
              )}
            </div>
          </div>
        </Skeleton>

        {data?.resume && (
          <Skeleton loading={isLoading}>
            <div className="resume-section">
              <div className="section-card">
                <h3 className="section-title">Resumo</h3>
                <div className="info-text">
                  {data.resume
                    .split("\\n")
                    .map((line: string, index: number) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </Skeleton>
        )}

        {data?.category &&
          (data?.category.categories?.length > 0 ||
            data?.category.type?.length > 0) && (
            <Skeleton loading={isLoading}>
              <div className="categories-section">
                <div className="section-card">
                  <h3 className="section-title">Categorias</h3>
                  <div className="tags-container">
                    {data?.category.type?.map((type: string, index: number) => (
                      <span key={index} className="tag tag-type">
                        {type}
                      </span>
                    ))}
                    {data?.category.categories?.map(
                      (cat: string, index: number) => (
                        <span key={index} className="tag tag-category">
                          {cat}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </Skeleton>
          )}

        <Skeleton loading={isLoading}>
          <div className="address-section">
            <div className="section-card">
              <div className="address-container">
                <div className="address-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="address-content">
                  <h3 className="address-title">Localização</h3>
                  <p className="address-text">
                    {formatAddress() ||
                      data?.resume ||
                      "Endereço não disponível"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Skeleton>

        {(data?.telephones?.whatsapp?.length > 0 ||
          data?.telephones?.telephone?.length > 0) && (
          <Skeleton loading={isLoading}>
            <div className="contact-section">
              <div className="section-card">
                <h3 className="section-title">Contato</h3>
                <div className="contact-list">
                  {data?.telephones?.whatsapp?.map(
                    (phone: string, index: number) => (
                      <div key={index} className="contact-item">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                            fill="currentColor"
                          />
                        </svg>
                        <span>{phone}</span>
                      </div>
                    ),
                  )}
                  {data?.telephones?.telephone?.map(
                    (phone: string, index: number) => (
                      <div key={index} className="contact-item">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                            fill="currentColor"
                          />
                        </svg>
                        <span>{phone}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </Skeleton>
        )}
      </div>
    </>
  );
}
