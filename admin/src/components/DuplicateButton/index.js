import React from "react";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import { Button } from "@strapi/design-system/Button";
import Duplicate from "@strapi/icons/Duplicate";
import { useCMEditViewDataManager } from "@strapi/helper-plugin";
import usePluginsQueryParams from "@strapi/admin/admin/src/content-manager/hooks/usePluginsQueryParams";

const DuplicateButton = () => {
  const { modifiedData, layout, isSingleType } = useCMEditViewDataManager();

  const {
    push,
    location: { pathname },
  } = useHistory();

  const { formatMessage } = useIntl();
  const pluginsQueryParams = usePluginsQueryParams();

  const handleDuplicate = () => {
    const copyPathname = pathname.replace(layout.uid, `${layout.uid}/create/clone`);
    push({
      pathname: copyPathname,
      state: { from: pathname },
      search: pluginsQueryParams,
    });
  };

  const content = {
    id: "duplicate-button.components.duplicate.button",
    defaultMessage: "Duplicate",
  };

  if (isSingleType) return null;
  return (
    <>
      {modifiedData.id && (
        <Button variant="secondary" startIcon={<Duplicate />} onClick={handleDuplicate}>
          {formatMessage(content)}
        </Button>
      )}
    </>
  );
};

export default DuplicateButton;
