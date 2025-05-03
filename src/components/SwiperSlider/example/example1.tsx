/*
* @example
 * // Basit kullanım
 * <CustomSwiper navigation pagination>
 *   <div>Slayt 1</div>
 *   <div>Slayt 2</div>
 * </CustomSwiper>
 * 
 * @example
 * // Özel butonlar ile
 * <CustomSwiper 
 *   navigation={{
 *     customButtons: true,
 *     renderPrevButton: (isDisabled) => <button className={isDisabled ? 'disabled' : ''}>Önceki</button>,
 *     renderNextButton: (isDisabled) => <button className={isDisabled ? 'disabled' : ''}>Sonraki</button>
 *   }}
 * >
 *   <div>Slayt 1</div>
 *   <div>Slayt 2</div>
 * </CustomSwiper>
*/