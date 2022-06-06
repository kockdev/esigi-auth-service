import { IsNotEmpty, IsOptional } from 'class-validator';
import { RoleEntity } from 'src/app/roles/role.entity';
import { UsersEntity } from 'src/app/users/users.entity';

export class UpdateProfileDto {
  @IsOptional()
  name: string;

  @IsOptional()
  role: RoleEntity;

  @IsOptional()
  user: UsersEntity[];
}
