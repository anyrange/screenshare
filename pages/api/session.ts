import type { NextApiRequest, NextApiResponse } from 'next'

import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('1234567890', 6)

type Id = {
  id: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Id>) {
  res.status(200).json({ id: nanoid() })
}
