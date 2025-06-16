export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  category: string
}

export const getCartItems = (): CartItem[] => {
  if (typeof window === "undefined") return []
  const cartStr = localStorage.getItem("cart")
  return cartStr ? JSON.parse(cartStr) : []
}

export const setCartItems = (items: CartItem[]) => {
  if (typeof window === "undefined") return
  localStorage.setItem("cart", JSON.stringify(items))
}

export const addToCart = (product: any) => {
  const items = getCartItems()
  const existingItem = items.find((item) => item.id === product.id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    items.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      category: product.category,
    })
  }

  setCartItems(items)
}

export const removeFromCart = (productId: string) => {
  const items = getCartItems().filter((item) => item.id !== productId)
  setCartItems(items)
}

export const updateCartQuantity = (productId: string, quantity: number) => {
  const items = getCartItems()
  const item = items.find((item) => item.id === productId)
  if (item) {
    item.quantity = quantity
    setCartItems(items)
  }
}

export const getCartTotal = (): number => {
  return getCartItems().reduce((total, item) => total + item.price * item.quantity, 0)
}

export const getCartCount = (): number => {
  return getCartItems().reduce((total, item) => total + item.quantity, 0)
}
