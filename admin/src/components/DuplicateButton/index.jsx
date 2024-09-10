import { LinkButton } from "@strapi/design-system";
import { Duplicate } from "@strapi/icons";
import React from "react";
import { useIntl } from "react-intl";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const DuplicateButton = () => {
  const { id: documentId, slug: modelUID, collectionType } = useParams();
  const isSingleType = collectionType === "single-types";

  const { formatMessage } = useIntl();

  const content = {
    id: "duplicate-button.components.duplicate.button",
    defaultMessage: "Duplicate",
  };

  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const goToCloneRoute = (evt) => {
    evt.preventDefault();
    navigate(pathname.replace(modelUID, `${modelUID}/clone`) + search);
  };

  if (isSingleType || !documentId || !modelUID) return null;
  if (documentId === "create" || documentId === "clone") return null;
  return (
    <>
      {window && window.location ? (
        <LinkButton
          href={
            // we use `window.location` here because strapi has set a
            // base path in the admin panel and `pathname` from `useLocation()`
            // does not include the base path
            window.location.href.replace(modelUID, `${modelUID}/clone`) + search
          }
          variant="secondary"
          style={{ width: "100%" }}
          startIcon={<Duplicate />}
          onClick={goToCloneRoute}
        >
          {formatMessage(content)}
        </LinkButton>
      ) : null}
    </>
  );
};

export default DuplicateButton;
