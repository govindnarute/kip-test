"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
class PaginationHelper {
  static buildPagination(query, count) {
    return {
      nextOffset: query.offset + query.limit,
      nextPage: parseInt((query.offset + query.limit) / query.limit + 1),
      totalCount: count
    };
  }
}
exports.PaginationHelper = PaginationHelper;
//# sourceMappingURL=PaginationHelper.js.map