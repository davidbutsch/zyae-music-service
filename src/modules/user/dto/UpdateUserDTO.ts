import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

class UpdateUserPreferences {}

/**
 * Local users reflect user state in a dedicated user/auth service. Only local properties should be mutable.
 *
 * `id`, `profile`, `flags`, and `metadata` are immutable
 * `preferences` may include local mutable properties defined in a seperate class
 */
export class UpdateUserDTO {
  @ValidateNested()
  @Type(() => UpdateUserPreferences)
  preferences: UpdateUserPreferences;
}
