package computershop.dto.userModel;

import lombok.Data;

import java.io.Serializable;

/**
 * A DTO for the {@link computershop.model.UserModel} entity
 */
@Data
public class UpdateUserPasswordDTO implements Serializable {
    private final String password;
    private final String confirmPassword;
}