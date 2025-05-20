import { Product } from "./product.type";

export type RootStackParamList = {
    Login: undefined;
    Main: undefined;
    Register: undefined;
    ProductForm: { product?: Product };
    ProductList: undefined;
    ProductDetail: { product: Product };
    FormScreen: { product?: Product };
    DetailScreen: { product: Product };
    // Thêm các screen khác của ứng dụng
  };
  
  // Nếu dùng React Navigation 6.x
  declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }