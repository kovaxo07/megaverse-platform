import { Controller, Get, Query } from '@nestjs/common';

@Controller('compliance')
export class ComplianceController {
  // Demo eligibility check: country + age
  @Get('eligibility')
  eligibility(@Query('country') country = 'US', @Query('age') age?: string) {
    const ageNum = Number(age ?? '0');
    // Simple demo policy: allow US and age >= 21; else deny with reasons
    const reasons: string[] = [];
    if (!country || country.toUpperCase() !== 'US') reasons.push('geo-fence: allowed = US only in demo');
    if (!Number.isFinite(ageNum) || ageNum < 21) reasons.push('age-restricted: 21+');
    const eligible = reasons.length === 0;
    return { eligible, reasons };
  }
}
