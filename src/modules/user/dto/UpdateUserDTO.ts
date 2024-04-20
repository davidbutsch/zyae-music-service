import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

class UpdateUserPreferences {}

/**
 * Local users reflect user state in a dedicated user/auth service. Only local properties should be mutable.
 * ^ if this is a music service, properties pertaining to music data should be mutable.
 *
 * `id`, `profile`, `flags`, and `metadata` are not local properties and are immutable
 * `preferences` may include local mutable properties defined in a seperate class
 */
export class UpdateUserDTO {
  @ValidateNested()
  @Type(() => UpdateUserPreferences)
  preferences: UpdateUserPreferences;
}
