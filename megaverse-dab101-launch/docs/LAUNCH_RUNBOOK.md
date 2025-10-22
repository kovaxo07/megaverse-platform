# The Megaverse — Launch Runbook

## 1) Smart Contracts
- Configure `.env` for Hardhat (`RPC_URL`, `PRIVATE_KEY`).
- Deploy DAB101 token, staking, escrow, and DAO to Polygon.
- Record contract addresses in `docs/ADDRESSES.json` and backend env.

## 2) Backend
- Set `JWT_SECRET`, connect to DB if used, and wire contract addresses.
- Expose routes: /mall, /arena, /arcade, /casino, /wallet

## 3) Frontend
- Connect wallet (MetaMask/WalletConnect), read $DAB balance & staking.
- Add VR Mall scene navigation and Store Template A.

## 4) Compliance gates
- Disable Casino routes until licensing, geofencing and KYC are active.
- Add Terms of Service, Privacy Policy, Responsible Gaming page.

## 5) Infra
- Easiest: `docker compose up` for local.
- Production: build & push images, apply k8s manifests, configure DNS & TLS.
