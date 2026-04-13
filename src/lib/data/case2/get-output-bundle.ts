import { cache } from "react";

import { buildCase2OutputBundle } from "./output";

export const getCase2OutputBundle = cache(() => buildCase2OutputBundle());
