import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZDBkOWQwMi1lYWJlLTQ5YTItOTA4Ny0zOWNlMzFjMTliMTYiLCJsb2dpbiI6InBlbGxlbnRlc3F1ZV91dCIsImlhdCI6MTczMjI3OTQ2OH0.yyvydRJK-jIHwzC4ZxeinT_lCOW2Dtrrf_Wfo_oxRWU',
  })
  refreshToken: string;
}
