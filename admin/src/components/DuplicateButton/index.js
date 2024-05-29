import React from "react";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import { Button } from "@strapi/design-system/Button";
import Duplicate from "@strapi/icons/Duplicate";
import { useCMEditViewDataManager, useFetchClient } from "@strapi/helper-plugin";

const DuplicateButton = () => {
  const { modifiedData, layout, isSingleType } = useCMEditViewDataManager();
  const { post } = useFetchClient();

  const {
    push,
    location: { pathname },
  } = useHistory();

  const { formatMessage } = useIntl();

  // copied from https://github.com/strapi/strapi/blob/v4.24.2/packages/core/admin/admin/src/content-manager/pages/ListView/ListViewPage.tsx#L542
  const handleCloneClick = async () => {
    try {
      const { data } = await post(
        `/content-manager/collection-types/${layout.uid}/auto-clone/${modifiedData.id}`
      );

      if ('id' in data) {
        const copyPathname = pathname.replace(`/${modifiedData.id}`, `/${data.id}`);
        push({
          pathname: `${copyPathname}`,
          state: {from: pathname}
        });
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error(err)
        const {prohibitedFields} = err.response?.data.error.details;
        setClonedEntryId(modifiedData.id);
        setProhibitedCloningFields(prohibitedFields);
      }
    }
  };

  const content = {
    id: "duplicate-button.components.duplicate.button",
    defaultMessage: "Duplicate",
  };

  if (isSingleType) return null;
  return (
    <>
      {modifiedData.id && (
        <Button variant="secondary" startIcon={<Duplicate />} onClick={handleCloneClick}>
          {formatMessage(content)}
        </Button>
      )}
    </>
  );
};

export default DuplicateButton;
