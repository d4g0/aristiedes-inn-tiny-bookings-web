import { useLazyQuery } from "./useLazyAuthQuerySmart_2";
import { ref, useContext, watch } from "@nuxtjs/composition-api";
import { useToastStore } from "~/stores/toast-storage";
import { API_ERRORS, TOAST_TYPES } from "~/db";

export const smartQueryLoader = (
  // graphql query
  query = "",
  // ref results outlet
  resultProcessingFn = (result) => {
    /* do what you want with result*/
  },
  // graphql response result key
  graphqlResponseResultKey = "",
  errorProcessingFn = null // (error) => {}
) => {
  // pinia
  const ctx = useContext();
  const pinia = ctx.$pinia;

  // toast
  const toastStore = useToastStore(pinia);
  const { showToastWithText } = toastStore;

  const { result, error, load, loading, setVariables, setQuery } =
    useLazyQuery(query);

  // result
  watch(result, (newR) => {
    // console.log({ newR });
    try {
      // const temp_err = '';
      if (newR?.errors) {
        console.log("Api error");
        var error = newR.errors[0];

        if (errorProcessingFn) {
          return errorProcessingFn(error);
        }

        console.log(error);
        // UNAUTHENTICATED
        if (error?.extensions?.code == API_ERRORS.UNAUTHENTICATED) {
          showToastWithText(
            TOAST_TYPES.error,
            "No tiene permiso para realizar esta operación",
            true
          );
        }

        // Duplicated
        if (
          error?.extensions?.exception?.code ==
          API_ERRORS.DB_UNIQUE_CONSTRAINT_ERROR
        ) {
          showToastWithText(
            TOAST_TYPES.error,
            "Fallo al crear el tipo de habitación porque ya existe uno con ese nombre",
            true
          );
        }

        // FORBIDDEN
        // Duplicated
        if (error?.extensions?.code == API_ERRORS.FORBIDDEN) {
          showToastWithText(
            TOAST_TYPES.error,
            "No tiene permiso para realizar esta operación",
            true
          );
        }

        // errors
        return;
      }

      // ref payload
      const payload = newR?.data[graphqlResponseResultKey];
      // console.log({ payload })
      if (payload) {
        // success
        resultProcessingFn(payload);
        return;
      }
    } catch (error) {
      console.log(error);
      showToastWithText(TOAST_TYPES.error, error.message, true);
    }
  });
  // error
  watch(error, (newE) => {
    if (newE) {
      if (errorProcessingFn) {
        return errorProcessingFn(newE);
      }
      console.log("fetch error");
      console.log(newE);
      showToastWithText(
        TOAST_TYPES.error,
        "Falló al contactar con el API",
        true
      );
    }
  });

  return {
    load,
    loading,
    setVariables,
    setQuery,
  };
};
