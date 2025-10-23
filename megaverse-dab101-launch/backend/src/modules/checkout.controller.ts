import { Body, Controller, Post } from '@nestjs/common';

@Controller('checkout')
export class CheckoutController {
  @Post('create')
  create(@Body() body: any) {
    // naive total calculation for demo
    const items: Array<{ id: string; qty: number; price?: number }> = body?.items || [];
    let total = 0;
    for (const it of items) {
      const price = typeof it.price === 'number' ? it.price : 1;
      total += price * (it.qty || 1);
    }
    const orderId = 'ord_' + Math.random().toString(36).slice(2, 10);
    return { orderId, total: Number(total.toFixed(2)) };
  }
}
